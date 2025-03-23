import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "./database";
import { User } from "./models/User";
import { Types } from "mongoose";
import { Project } from "./models/Project";
import Message from "./models/Message";



dotenv.config();
connectDB();

const app: Application = express(); // ✅ Se till att Express är korrekt typad

// Middleware
app.use(cors());
app.use(express.json());

// Hämta alla användare
app.get("/users", async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET || "secret");

        const users = await User.find().select("-password"); // 🔥 Hämta alla användare utan lösenord
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

app.post("/messages", async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderName, senderEmail, message } = req.body;

    // Kontrollera att alla nödvändiga fält finns
    if (!senderName || !senderEmail || !message) {
      res.status(400).json({ message: "Alla fält är obligatoriska." });
      return;
    }

    // Skapa ett nytt meddelande i databasen
    const newMessage = new Message({
      senderName,
      senderEmail,
      message
    });

    await newMessage.save();

    res.status(201).json({ message: "Meddelande sparat." });
  } catch (error) {
    console.error("Fel vid sparande av meddelande:", error);
    res.status(500).json({ message: "Ett fel inträffade vid sparande." });
  }
});

app.get("/messages", async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Fel vid hämtning av meddelanden:", error);
    res.status(500).json({ message: "Ett fel inträffade vid hämtning." });
  }
});

app.delete("/projects/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Ingen token." });
      return;
    }

    // Optionally verify token or user permissions here

    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Ogiltigt projekt-ID." });
      return;
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      res.status(404).json({ message: "Projektet hittades inte." });
      return;
    }

    res.status(200).json({ message: "Projektet har raderats." });
  } catch (error) {
    console.error("Fel vid borttagning av projekt:", error);
    res.status(500).json({ message: "Serverfel vid borttagning av projekt." });
  }
});

app.get("/projects", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error fetching projects" });
  }
});

app.post("/projects", async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Ingen token." });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const adminUser = await User.findById(decoded.id);

    if (!adminUser?.isAdmin) {
      res.status(403).json({ message: "Endast admins kan lägga till projekt." });
      return;
    }

    const { title, description, demoLink, githubLink } = req.body;

    if (!title || !description || !demoLink || !githubLink) {
      res.status(400).json({ message: "Alla fält krävs." });
      return;
    }

    const newProject = new Project({ title, description, demoLink, githubLink });
    await newProject.save();

    res.status(201).json({ message: "Projekt tillagt.", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel vid tillägg av projekt." });
  }
});

app.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("🔹 Registreringsförfrågan mottagen:", req.body);

        const { name, email, password } = req.body;

        // Kontrollera om användaren redan finns
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("⚠️ Användaren finns redan!");
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hasha lösenordet
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Skapa ny användare
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log("✅ Användare skapad:", newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("🚨 Serverfel vid registrering:", errMessage);
        res.status(500).json({ message: "Server error", error: errMessage });
    }
});

// Inloggningsroute
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("🔍 Inloggningsförfrågan mottagen:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log("⚠️ Saknas e-post eller lösenord!");
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // Kontrollera om användaren finns
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Användaren hittades inte!");
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        console.log("🔑 Lösenord i databasen:", user.password);
        console.log("🔑 Lösenord från klienten:", password);

        // Kontrollera lösenord
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 bcrypt.compare() resultat:", isMatch);

        if (!isMatch) {
            console.log("❌ Fel lösenord!");
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        console.log("✅ Inloggning lyckades! Token genererad.");

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("🚨 Serverfel vid inloggning:", errMessage);
        res.status(500).json({ message: "Server error", error: errMessage });
    }
});

// Ta bort användare (admin only)
app.delete("/users/:id", async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Ingen token." });
      return;
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      const adminUser = await User.findById(decoded.id);
      if (!adminUser?.isAdmin) {
        res.status(403).json({ message: "Endast admins kan ta bort användare." });
        return;
      }
  
      const userIdToDelete = req.params.id;
      if (!Types.ObjectId.isValid(userIdToDelete)) {
        res.status(400).json({ message: "Ogiltigt användar-ID" });
        return;
      }
  
      await User.findByIdAndDelete(userIdToDelete);
      res.json({ message: "Användare borttagen" });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Ogiltig token" });
    }
  });
  
  // Admin: skapa ny användare
  app.post("/users", async (req: Request, res: Response): Promise<any> => {
    console.log("🔹 Skapa användare – inkommande body:", req.body);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Ingen token." });
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      console.log("🔐 Token payload:", decoded);
      const adminUser = await User.findById(decoded.id);
      if (!adminUser?.isAdmin) {
        res.status(403).json({ message: "Endast admins kan skapa användare." });
        return;
      }
  
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ message: "Alla fält krävs." });
        return;
      }
  
      const existing = await User.findOne({ email });
      if (existing) {
        res.status(409).json({ message: "E-postadressen används redan." });
        return;
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "Användare skapad", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Serverfel vid skapande av användare" });
    }
  });
  

app.post("/test-hash", async (req: Request, res: Response) => {
    const { password } = req.body;

    // Simulera hashning och direkt jämförelse
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hashed);

    res.json({
        original: password,
        hashed,
        isMatch
    });
});

app.put("/users/:id/make-admin", async (req: Request, res: Response): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Ingen token." });
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      const adminUser = await User.findById(decoded.id);
  
      if (!adminUser?.isAdmin) {
        return res.status(403).json({ message: "Endast admins får ge adminrättigheter." });
      }
  
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        { isAdmin: true },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Användare hittades inte." });
  
      res.json({ message: "✅ Användare är nu admin", user: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Serverfel vid uppdatering." });
    }
  });

// Enkel test-route
app.get("/", (req: Request, res: Response) => {
    res.send("Portfolio API is running!");
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
