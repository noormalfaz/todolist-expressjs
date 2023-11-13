const { Todo } = require("../models");

const getAllTodo = async (req, res) => {
  try {
    const { id } = req.payload;
    const dataTodo = await Todo.findAll({
      where: { user_id: id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: 200,
      message: "Data todo",
      data: dataTodo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.payload;
    const dataTodo = await Todo.findOne({
      where: { id: req.params.id, user_id: id },
    });
    if (!dataTodo) {
      return res.status(400).json({
        status: 400,
        message: "Data not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Detailed todo data",
      data: dataTodo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { id } = req.payload;
    const { title, is_completed } = req.body;

    const dataTodo = await Todo.create({
      title,
      user_id: id,
      is_completed: is_completed,
    });
    res.status(201).json({
      status: 201,
      message: "Your todo was successfully created",
      data: dataTodo,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.payload;
    const { title, is_completed } = req.body;

    const dataTodo = await Todo.findOne({
      where: { id: req.params.id, user_id: id },
    });
    if (!dataTodo) {
      return res.status(400).json({
        status: 400,
        message: "Data not found",
      });
    }

    await Todo.update(
      { title, user_id: id, is_completed },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Your todo was successfully changed",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.payload;
    const dataTodo = await Todo.findOne({
      where: { id: req.params.id, user_id: id },
    });
    if (!dataTodo) {
      return res.status(400).json({
        status: 400,
        message: "Data not found",
      });
    }
    await Todo.destroy({ where: { id: req.params.id, user_id: id } });
    res.status(200).json({
      status: 200,
      message: "Your todo was successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

const deleteAllTodo = async (req, res) => {
  try {
    const { id } = req.payload;
    await Todo.destroy({ where: { user_id: id } });
    res.status(200).json({
      status: 200,
      message: "Your todo was successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error on todo",
    });
  }
};

module.exports = {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
};