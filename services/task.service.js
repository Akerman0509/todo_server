const mongoose = require("mongoose");
const taskModel = require("../models/task.schema");
const ObjectId = require("mongodb").ObjectId;

class taskService {
    validateTaskInput(task) {
        if (!task) {
            throw new Error("Task data is required");
        }
        if (!task["description"]) {
            throw new Error("[Error][Missing] Task description is required");
        }
        // if (!task["due_date"]) {
        //     throw new Error("[Error][Missing] Task due_date is required");
        // }
    }
    async createTasks(task) {
        this.validateTaskInput(task);
        const prepareTask = {
            ...task,
            finish: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const newTask = await taskModel.create(prepareTask);

        return newTask;
    }
    async getTasks(filters) {
        // console.log(filters);
        // Prepare dynamic filter
        const mongoFilter = {};
        if (filters.finish) {
            // Convert 'true'/'false' strings to boolean
            mongoFilter.finish = filters.finish === "true";
        }
        if (filters.due_date) {
            const startDate = new Date(filters.due_date); 
            const endDate = new Date(startDate);
            endDate.setUTCDate(startDate.getUTCDate() + 1); 
        
            mongoFilter.due_date = {
                $gte: startDate, // Start of the given day
                $lt: endDate,    // Before the next day
            };
        }
        console.log("filters", mongoFilter);
        const pipeline = [
            {
                $match: mongoFilter,
            },
        ];
        let sortOrder = -1;
        if(filters.order){
            sortOrder = filters.order === "asc" ? 1 : -1;
        }
        pipeline.push({
            $sort: {
                createdAt: sortOrder,
            },
        });

        const tasks = await taskModel.aggregate(pipeline);
        // const tasks = await taskModel.find({finish: false});

        return tasks;
    }
    async updateTask(id, task) {
        const update = task;
        const filter = { _id: id };

        // const updateTask = await taskModel.findOneAndUpdate(filter, update , {new: true});
        const updateTask = await taskModel.findOneAndUpdate(
            { _id: new ObjectId(id) },
            update,
            { new: true }
        );
        // console.log(updateTask);
        return updateTask;
    }
    async deleteTask(id) {
        const deleteTask = await taskModel.deleteOne({ _id: new ObjectId(id) });
        console.log(deleteTask);
        return deleteTask;
    }

    async createSudoTask() {
        let array = [true, false];
        for (let i = 0; i < 10; i++) {
            const task = {
                description: `Task ${i}`,
                finish: Math.floor(Math.random() * 2),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await taskModel.create(task);
        }
        return { message: "Sudo Task Created" };
    }
}

module.exports = new taskService();
