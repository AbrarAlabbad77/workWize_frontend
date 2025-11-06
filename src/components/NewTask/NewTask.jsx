import { useState } from "react";
import axios from "axios";
import { getTokens } from '../../lib/auth'
import { toast } from "sonner";



// from shadcn
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

function NewTask({ open, onClose, projectId, onTaskCreated}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_data: "",
        state: "",
        priority: "",
        assignee: "",
        project_id: projectId,
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { access } = getTokens();

            await axios.post(`http://127.0.0.1:8000/api/projects/${projectId}/add-task/`, formData, {
                headers: {
                    Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            });
            toast.success("🎉 Task added successfully!");
            onClose()
            onTaskCreated();

        } catch (error) {
            console.error("Task creation error:", error.response?.data || error);
             if (error.response?.data?.assignee) {
            alert("❌ Invalid Team Member ID — user does not exist.");
        }
        }
       
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">

                {/* Headers  */}
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill out the fields to add a new task
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <label>Task Title</label>
                    <input name="title" placeholder="Task Title" required onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />

                    <label>Description</label>
                    <textarea name="description" placeholder="Task description" onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />

                    <label>due_data</label>
                    <input type="date" name="due_data" required onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />


                    {/* State dropdown */}
                    <label>State</label>
                    <select name="state" required onChange={handleChange} className="w-full border px-3 py-2 rounded-lg">
                        <option value="">Select Status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>

                    {/* Priority dropdown */}
                    <label>Task Priority</label>
                    <select name="priority" required onChange={handleChange} className="w-full border px-3 py-2 rounded-lg">
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <label>Assignee ID</label>
                    <input type="number" name="assignee" placeholder="Team Member ID" onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg" />

                    {/* buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                            Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
                            Create Task</button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}
export default NewTask

