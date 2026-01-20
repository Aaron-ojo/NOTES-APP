import Note from "../models/Note.model.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = (await Note.find({ user: req.user.id })).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json("please enter a title");
    }

    if (!content || content.trim() === "") {
      return res.status(400).json("please enter note content");
    }

    const note = await Note.create({ title, content, user: req.user.id });

    res.status(201).json({
      message: "note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ message: "title cannot be empty" });
    }

    if (content !== undefined && content.trim() === "") {
      return res.status(400).json({ message: "content cannot be empty" });
    }

    const titleExists = await Note.findOne({
      title,
      user: req.user.id,
      _id: { $ne: id },
    });

    if (titleExists) {
      return res
        .status(400)
        .json({ success: false, message: "title already exists" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();

    res.status(200).json({
      success: true,
      message: "note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
