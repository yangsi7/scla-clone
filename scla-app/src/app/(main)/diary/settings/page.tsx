'use client';

import React, { useState } from 'react';
import { ChevronLeft, X, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PREDEFINED_SYMPTOMS, PREDEFINED_TRIGGERS } from '@/mock/constants';
import { Input } from '@/components/ui/input';

export default function DiarySettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'symptoms' | 'triggers'>('symptoms');
  const [searchTerm, setSearchTerm] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>(PREDEFINED_SYMPTOMS);
  const [triggers, setTriggers] = useState<string[]>(PREDEFINED_TRIGGERS);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newItem, setNewItem] = useState('');

  const filteredItems = activeTab === 'symptoms' 
    ? symptoms.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : triggers.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = () => {
    if (newItem.trim()) {
      if (activeTab === 'symptoms') {
        setSymptoms([...symptoms, newItem.trim()]);
      } else {
        setTriggers([...triggers, newItem.trim()]);
      }
      setNewItem('');
      setShowAddInput(false);
    }
  };

  const handleRemove = (item: string) => {
    if (activeTab === 'symptoms') {
      setSymptoms(symptoms.filter(s => s !== item));
    } else {
      setTriggers(triggers.filter(t => t !== item));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <button 
          onClick={() => router.back()}
          className="p-1 -ml-1 mr-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </button>
        <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
          Manage Symptoms & Triggers
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b bg-gray-50">
        <div className="flex">
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'symptoms'
                ? 'text-[rgb(var(--scla-primary-blue))] border-b-2 border-[rgb(var(--scla-primary-blue))] bg-white'
                : 'text-gray-600'
            }`}
          >
            Symptoms
          </button>
          <button
            onClick={() => setActiveTab('triggers')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'triggers'
                ? 'text-[rgb(var(--scla-primary-blue))] border-b-2 border-[rgb(var(--scla-primary-blue))] bg-white'
                : 'text-gray-600'
            }`}
          >
            Triggers
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {/* Add new item */}
          {showAddInput ? (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Input
                type="text"
                placeholder={`Enter new ${activeTab.slice(0, -1)}...`}
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                autoFocus
                className="flex-1"
              />
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddInput(false);
                  setNewItem('');
                }}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddInput(true)}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Custom {activeTab.slice(0, -1)}</span>
            </button>
          )}

          {/* Items list */}
          {filteredItems.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-800">{item}</span>
              <button
                onClick={() => handleRemove(item)}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          ))}

          {filteredItems.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}