import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export function ProjectModal() {
  const {
    isProjectModalOpen,
    closeProjectModal,
    editingProject,
    addProject,
    updateProject,
  } = useApp();

  const isEditing = Boolean(editingProject && editingProject.id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    status: 'In Progress',
    category: 'Engineering',
    color: '#88BDF2',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || '',
        description: editingProject.description || '',
        deadline: editingProject.deadline || '',
        status: editingProject.status || 'In Progress',
        category: editingProject.category || 'Engineering',
        color: editingProject.color || '#88BDF2',
      });
      setErrors({});
    } else {
      setFormData({
        name: '',
        description: '',
        deadline: '',
        status: 'In Progress',
        category: 'Engineering',
        color: '#88BDF2',
      });
      setErrors({});
    }
  }, [editingProject, isProjectModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Project name is required' });
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (isEditing) {
      updateProject(editingProject.id, payload);
    } else {
      addProject(payload);
    }

    closeProjectModal();
  };

  const statusOptions = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'In Review', value: 'In Review' },
    { label: 'Ongoing', value: 'Ongoing' },
    { label: 'Completed', value: 'Completed' },
  ];

  const colorOptions = [
    { label: 'Sky Blue (#88BDF2)', value: '#88BDF2' },
    { label: 'Slate Blue (#6A89A7)', value: '#6A89A7' },
    { label: 'Deep Navy (#384959)', value: '#384959' },
    { label: 'Ice Accent (#BDDDFC)', value: '#BDDDFC' },
  ];

  return (
    <Modal
      isOpen={isProjectModalOpen}
      onClose={closeProjectModal}
      title={isEditing ? 'Edit Project' : 'Create New Project'}
      description="Organize your milestones and group related tasks together."
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          required
          placeholder="e.g. Website Development"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <div className="w-full">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Summary of objectives, deliverables, and targets..."
            className="w-full rounded-xl border text-sm transition-all duration-200 bg-white/90 dark:bg-slatebg-darkcard/90 text-brand-900 dark:text-white placeholder:text-brand-500/60 dark:placeholder:text-slate-400 p-3 border-brand-200 dark:border-brand-700/80 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
          />
        </div>

        <Input
          label="Target Deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={statusOptions}
          />

          <Select
            label="Palette Color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            options={colorOptions}
          />
        </div>

        <Input
          label="Category"
          placeholder="e.g. Engineering, Academic, Personal"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-100 dark:border-brand-800">
          <Button variant="secondary" onClick={closeProjectModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
