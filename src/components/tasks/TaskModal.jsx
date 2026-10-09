import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export function TaskModal() {
  const {
    isTaskModalOpen,
    closeTaskModal,
    editingTask,
    addTask,
    updateTask,
    projects,
  } = useApp();

  const isEditing = Boolean(editingTask && editingTask.id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: 'Website Development',
    priority: 'Medium',
    status: 'To Do',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'Development',
    tags: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        project: editingTask.project || (projects[0]?.name || 'General'),
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'To Do',
        dueDate: editingTask.dueDate || new Date().toISOString().split('T')[0],
        category: editingTask.category || 'General',
        tags: Array.isArray(editingTask.tags)
          ? editingTask.tags.join(', ')
          : editingTask.tags || '',
      });
      setErrors({});
    } else {
      setFormData({
        title: '',
        description: '',
        project: projects[0]?.name || 'General',
        priority: 'Medium',
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        category: 'Development',
        tags: '',
      });
      setErrors({});
    }
  }, [editingTask, isTaskModalOpen, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrors({ title: 'Task title is required' });
      return;
    }

    const matchedProject = projects.find((p) => p.name === formData.project);

    const payload = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      projectId: matchedProject ? matchedProject.id : null,
    };

    if (isEditing) {
      updateTask(editingTask.id, payload);
    } else {
      addTask(payload);
    }

    closeTaskModal();
  };

  const projectOptions = projects.map((p) => ({
    label: p.name,
    value: p.name,
  }));

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' },
  ];

  const statusOptions = [
    { label: 'To Do', value: 'To Do' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  return (
    <Modal
      isOpen={isTaskModalOpen}
      onClose={closeTaskModal}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      description={
        isEditing
          ? 'Update the details and tracking information for this task.'
          : 'Define task details, priority, and assign it to a project.'
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          required
          placeholder="e.g. Complete React Dashboard"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
        />

        <div className="w-full">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add relevant notes, checklist items, or guidelines..."
            className="w-full rounded-xl border text-sm transition-all duration-200 bg-white/90 dark:bg-slatebg-darkcard/90 text-brand-900 dark:text-white placeholder:text-brand-500/60 dark:placeholder:text-slate-400 p-3 border-brand-200 dark:border-brand-700/80 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Project"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            options={projectOptions}
          />

          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            options={priorityOptions}
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={statusOptions}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Category"
            placeholder="e.g. Development, Academic, Study"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <Input
            label="Tags (Comma separated)"
            placeholder="e.g. React, UI/UX, Priority"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-100 dark:border-brand-800">
          <Button variant="secondary" onClick={closeTaskModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
