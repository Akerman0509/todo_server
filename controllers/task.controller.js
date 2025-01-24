const asyncHandler = require("express-async-handler");

const { handleServiceError, handleResponse } = require("../utils/helperFunc");

const taskService = require("../services/task.service");

exports.createTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await taskService.createTasks(req.body);
        return res
            .status(200)
            .json(handleResponse(true, "Create tasks successfully", tasks));
    } catch (error) {
        handleServiceError(res, error);
    }
});

exports.getTasks = asyncHandler(async (req, res) => {
    try {
        const filters = {
            finish: req.query.finish,
            order: req.query.order,
        };
        const tasks = await taskService.getTasks(
            Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v != null) // Remove null values from filters
            )
        );
        return res
            .status(200)
            .json(handleResponse(true, "Get tasks successfully", tasks));
    } catch (error) {
        handleServiceError(res, error);
    }
});

exports.updateTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await taskService.updateTask(req.params, req.body);
        return res
            .status(200)
            .json(handleResponse(true, "Update tasks successfully", tasks));
    } catch (error) {
        handleServiceError(res, error);
    }
});

exports.deleteTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await taskService.deleteTask(req.params);
        return res
            .status(200)
            .json(handleResponse(true, "Delete tasks successfully", tasks));
    } catch (error) {
        handleServiceError(res, error);
    }
});

exports.createSudoTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await taskService.createSudoTask(req.body);
        return res
            .status(200)
            .json(handleResponse(true, "Create tasks successfully", tasks));
    } catch (error) {
        handleServiceError(res, error);
    }
});
