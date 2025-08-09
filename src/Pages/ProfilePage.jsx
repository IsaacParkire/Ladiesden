import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, ShoppingBag, Settings, Edit, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    birthdate: '1990-05-15',
    membershipType: 'VIP',
    joinDate: '2024-01-15'
  });

  const [editForm, setEditForm] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...user });
  };

  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    {user.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {user.membershipType} Member
                    </span>
                    <span className="text-sm">
                      Member since {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex justify-center sm:justify-start">
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="w-full px-4 py-3 bg-gray-50 rounded-lg">{user.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="w-full px-4 py-3 bg-gray-50 rounded-lg">{user.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="w-full px-4 py-3 bg-gray-50 rounded-lg">{user.phone}</p>
                    )}
                  </div>

                  {/* Birthdate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm.birthdate}
                        onChange={(e) => handleInputChange('birthdate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="w-full px-4 py-3 bg-gray-50 rounded-lg">
                        {new Date(user.birthdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="w-full px-4 py-3 bg-gray-50 rounded-lg">{user.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-600">Favorites</span>
                  </div>
                  <span className="font-semibold text-gray-800">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">Orders</span>
                  </div>
                  <span className="font-semibold text-gray-800">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Bookings</span>
                  </div>
                  <span className="font-semibold text-gray-800">5</span>
                </div>
              </div>
            </div>

            {/* Membership Info */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">
                {user.membershipType} Membership
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-90">Status:</span>
                  <span className="font-semibold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Next Billing:</span>
                  <span className="font-semibold">Jan 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Benefits:</span>
                  <span className="font-semibold">All Access</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all px-4 py-2 rounded-lg font-medium">
                Manage Membership
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Account Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Order History</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">My Favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
