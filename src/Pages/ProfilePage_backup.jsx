import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Heart, ShoppingBag, Settings, Edit, Save, X, 
  Camera, Upload, CreditCard, Bell, Shield, LogOut, Package, Star, Clock, Award 
} from 'lucide-react';
import WelcomeModal from '../Components/WelcomeModal';

const ProfilePage = () => {
  const navigate = useNavigate();  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
    const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    birthdate: '1990-05-15',
    membershipType: 'VIP Elite',
    membershipStatus: 'Active',
    joinDate: '2024-01-15',
    nextBilling: '2025-01-15',
    profileImage: null
  });

  const [editForm, setEditForm] = useState({ ...user });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }    // Load user data from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedName = localStorage.getItem('userName');
    const storedMembershipType = localStorage.getItem('membershipType');
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const currentTime = new Date().getTime();
    
    // Check if this is a new session (first visit or more than 1 hour since last login)
    const isNewSession = !lastLoginTime || (currentTime - parseInt(lastLoginTime)) > 3600000; // 1 hour
    
    if (storedEmail || storedName || storedMembershipType) {
      const newUser = {
        ...user,
        email: storedEmail || user.email,
        name: storedName || user.name,
        membershipType: storedMembershipType === 'basic' ? 'Basic' : 
                        storedMembershipType === 'premium' ? 'Premium' : 
                        storedMembershipType === 'vip' ? 'VIP Elite' : user.membershipType,
        joinDate: new Date().toISOString().split('T')[0] // Set current date as join date for new users
      };
      
      setUser(newUser);
      
      // Show welcome modal for new sessions
      if (isNewSession) {
        setIsNewUser(!lastLoginTime); // New user if no previous login time
        setShowWelcomeModal(true);
        localStorage.setItem('lastLoginTime', currentTime.toString());
      }
    }
  }, [navigate]);

  useEffect(() => {
    setEditForm({ ...user });
  }, [user]);
  const [orderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2024-12-15',
      items: ['Signature Massage Package', 'Aromatherapy Session'],
      total: 299.99,
      status: 'Completed'
    },
    {
      id: 'ORD-002', 
      date: '2024-12-01',
      items: ['VIP Membership Upgrade', 'Premium Scent Collection'],
      total: 149.99,
      status: 'Completed'
    },
    {
      id: 'ORD-003',
      date: '2024-11-20',
      items: ['Personal Training Session'],
      total: 89.99,
      status: 'Pending'
    }
  ]);

  // Sample favorites data
  const [favorites] = useState([
    {
      id: 1,
      name: 'Signature Full Body Massage',
      category: 'Massage',
      price: 159.99,
      image: '/Ladiesden/images/massage1.jpeg'
    },
    {
      id: 2,
      name: 'Premium Aromatherapy Kit',
      category: 'Scents',
      price: 79.99,
      image: '/Ladiesden/images/herscent1.jpeg'
    },
    {
      id: 3,
      name: 'Elite Fitness Package',
      category: 'Fitness',
      price: 199.99,
      image: '/Ladiesden/images/herstrength1.jpg'
    }
  ]);

  // Sample bookings data
  const [upcomingBookings] = useState([
    {
      id: 1,
      service: 'Deep Tissue Massage',
      date: '2024-12-28',
      time: '2:00 PM',
      therapist: 'Maria Rodriguez',
      status: 'Confirmed'
    },
    {
      id: 2,
      service: 'Personal Training',
      date: '2024-12-30',
      time: '10:00 AM',
      trainer: 'Jessica Chen',
      status: 'Confirmed'
    }
  ]);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    bookingReminders: true
  });
  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...user });
  };
  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditing(false);
    
    // Save updated user data to localStorage
    localStorage.setItem('userEmail', editForm.email);
    localStorage.setItem('userName', editForm.name);
    
    // Here you would typically save to your backend
    console.log('Profile updated:', editForm);
  };

  const handleCancel = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setEditForm(prev => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('membershipType');
    navigate('/');
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const getMembershipColor = (type) => {
    switch(type) {
      case 'Basic': return 'from-gray-400 to-gray-500';
      case 'Premium': return 'from-yellow-400 to-yellow-600';
      case 'VIP Elite': return 'from-pink-500 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        userName={user.name.split(' ')[0]}
        membershipType={user.membershipType}
        isNewUser={isNewUser}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your account and explore your wellness journey
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-all mt-4 sm:mt-0"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm sm:text-base font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold overflow-hidden">
                      {(profileImage || user.profileImage) ? (
                        <img 
                          src={profileImage || user.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full cursor-pointer hover:bg-pink-600 transition-all">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                      {user.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-4">
                      <span className={`bg-gradient-to-r ${getMembershipColor(user.membershipType)} text-white px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1`}>
                        <Award className="w-3 h-3" />
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
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
                  <span className="text-sm text-gray-500">{orderHistory.length} orders</span>
                </div>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-pink-500" />
                          <span className="font-medium text-gray-800">Order #{order.id}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <ul className="text-gray-600 text-sm">
                          {order.items.map((item, index) => (
                            <li key={index} className="mb-1">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-gray-800">${order.total}</span>
                        <button className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h3>
                  <button 
                    onClick={() => navigate('/booking')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:from-pink-600 hover:to-purple-600 transition-all"
                  >
                    Book New Service
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-purple-500" />
                          <span className="font-medium text-gray-800">{booking.service}</span>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {booking.time}
                        </div>
                        <div>
                          <span className="font-medium">With:</span> {booking.therapist || booking.trainer}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                          Reschedule
                        </button>
                        <button className="text-gray-500 hover:text-gray-600 text-sm font-medium">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">My Favorites</h3>
                  <span className="text-sm text-gray-500">{favorites.length} items</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {item.category}
                          </span>
                          <Heart className="w-4 h-4 text-pink-500 fill-current" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800">${item.price}</span>
                          <button className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h3>
                
                <div className="space-y-8">
                  {/* Notification Settings */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-purple-500" />
                      Notification Preferences
                    </h4>
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive text message alerts' },
                        { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional offers and news' },
                        { key: 'bookingReminders', label: 'Booking Reminders', description: 'Get reminders about upcoming appointments' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h5 className="font-medium text-gray-800">{setting.label}</h5>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[setting.key]}
                              onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Security
                    </h4>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-800">Change Password</h5>
                            <p className="text-sm text-gray-600">Update your account password</p>
                          </div>
                          <span className="text-pink-500">→</span>
                        </div>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-800">Two-Factor Authentication</h5>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                          </div>
                          <span className="text-pink-500">→</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Settings */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      Payment Methods
                    </h4>
                    <button 
                      onClick={() => navigate('/payment-methods')}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-800">Manage Payment Methods</h5>
                          <p className="text-sm text-gray-600">Add, edit, or remove payment cards</p>
                        </div>
                        <span className="text-pink-500">→</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                  <span className="font-semibold text-gray-800">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">Orders</span>
                  </div>
                  <span className="font-semibold text-gray-800">{orderHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Bookings</span>
                  </div>
                  <span className="font-semibold text-gray-800">{upcomingBookings.length}</span>
                </div>
              </div>
            </div>

            {/* Membership Info */}
            <div className={`bg-gradient-to-r ${getMembershipColor(user.membershipType)} rounded-2xl shadow-xl p-6 text-white`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                {user.membershipType} Membership
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-90">Status:</span>
                  <span className="font-semibold">{user.membershipStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Next Billing:</span>
                  <span className="font-semibold">
                    {new Date(user.nextBilling).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Benefits:</span>
                  <span className="font-semibold">All Access</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/membership')}
                className="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all px-4 py-2 rounded-lg font-medium"
              >
                Manage Membership
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/booking')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Book Service</span>
                </button>
                <button 
                  onClick={() => navigate('/services')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Star className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Browse Services</span>
                </button>                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
