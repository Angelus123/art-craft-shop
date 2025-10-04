import { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaStar, FaHeart, FaTimes, FaImage, FaDollarSign, FaTag, FaUser, FaPalette, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface ThemeStyles {
  mutedText: string;
  buttonBg: string;
  cardBg: string;
  borderColor: string;
  inputBg: string;
  textColor: string;
  tableHeaderBg: string;
  tableRowHover: string;
  secondaryBg: string;
}

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  status: string;
  category: string;
  medium: string;
  views: number;
  likes: number;
  featured: boolean;
  description?: string;
  imageUrl?: string;
  dimensions?: string;
  createdAt?: string;
}

interface ArtworksManagementProps {
  themeStyles: ThemeStyles;
}

// Toast component
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transform transition-transform duration-300 translate-x-0 ${
      type === 'success' 
        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
        : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {type === 'success' ? <FaCheck size={12} /> : <FaExclamationTriangle size={12} />}
        </div>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          <FaTimes size={14} />
        </button>
      </div>
    </div>
  );
};

export default function ArtworksManagement({ themeStyles }: ArtworksManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null);
  const [newArtwork, setNewArtwork] = useState<Partial<Artwork>>({
    title: '',
    artist: '',
    price: 0,
    status: 'AVAILABLE',
    category: '',
    medium: '',
    description: '',
    dimensions: '',
    featured: false
  });

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/artworks');
      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }
      const data = await response.json();
      console.log('Fetched artworks:', data); // Debug log
      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      showToast('Failed to fetch artworks', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const formatStatus = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'Available';
      case 'SOLD': return 'Sold';
      case 'RESERVED': return 'Reserved';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'SOLD': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'RESERVED': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Updated filteredArtworks with sorting - featured first, then by title
  const filteredArtworks = artworks
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || artwork.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || artwork.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      // Featured artworks first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by creation date (newest first) if available
      if (a.createdAt && b.createdAt) {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateB > dateA) return 1;
        if (dateB < dateA) return -1;
      }
      
      // Finally by title alphabetically
      return a.title.localeCompare(b.title);
    });

  // Modal Handlers
  const openCreateModal = () => {
    setNewArtwork({
      title: '',
      artist: '',
      price: 0,
      status: 'AVAILABLE',
      category: '',
      medium: '',
      description: '',
      dimensions: '',
      featured: false
    });
    setIsCreateModalOpen(true);
  };

  const openViewModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsViewModalOpen(true);
  };

  const openEditModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setNewArtwork({ ...artwork });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (artwork: Artwork) => {
    setArtworkToDelete(artwork);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedArtwork(null);
    setArtworkToDelete(null);
    setNewArtwork({
      title: '',
      artist: '',
      price: 0,
      status: 'AVAILABLE',
      category: '',
      medium: '',
      description: '',
      dimensions: '',
      featured: false
    });
  };

  // CRUD Operations
  const handleCreateArtwork = async () => {
    setModalLoading(true);
    try {
      const response = await fetch('/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newArtwork,
          price: parseFloat(newArtwork.price as any) || 0,
          featured: Boolean(newArtwork.featured),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create artwork');
      }

      await fetchArtworks();
      closeModals();
      showToast('Artwork created successfully!');
    } catch (error) {
      console.error('Error creating artwork:', error);
      showToast('Failed to create artwork. Please try again.', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateArtwork = async () => {
    if (!selectedArtwork?.id) return;
    setModalLoading(true);
    try {
      const response = await fetch(`/api/artworks/${selectedArtwork.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newArtwork,
          price: parseFloat(newArtwork.price as any) || 0,
          featured: Boolean(newArtwork.featured),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update artwork');
      }

      await fetchArtworks();
      closeModals();
      showToast('Artwork updated successfully!');
    } catch (error) {
      console.error('Error updating artwork:', error);
      showToast('Failed to update artwork. Please try again.', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteArtwork = async () => {
    if (!artworkToDelete?.id) return;
    
    setModalLoading(true);
    try {
      const response = await fetch(`/api/artworks/${artworkToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete artwork');
      }

      await fetchArtworks();
      closeModals();
      showToast('Artwork deleted successfully!');
    } catch (error) {
      console.error('Error deleting artwork:', error);
      showToast('Failed to delete artwork. Please try again.', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Updated handleToggleFeatured to persist to database
  const handleToggleFeatured = async (artwork: Artwork) => {
    try {
      const updatedFeaturedStatus = !artwork.featured;
      
      const response = await fetch(`/api/artworks/${artwork.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...artwork,
          featured: updatedFeaturedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update featured status');
      }

      // Update local state
      setArtworks(prev => prev.map(item => 
        item.id === artwork.id 
          ? { ...item, featured: updatedFeaturedStatus }
          : item
      ));

      showToast(
        updatedFeaturedStatus 
          ? 'Artwork featured successfully!' 
          : 'Artwork unfeatured successfully!'
      );
    } catch (error) {
      console.error('Error toggling featured status:', error);
      showToast('Failed to update featured status. Please try again.', 'error');
    }
  };

  const handleInputChange = (field: keyof Artwork, value: string | number | boolean) => {
    setNewArtwork(prev => ({ ...prev, [field]: value }));
  };

  // Delete Confirmation Modal
  const renderDeleteModal = () => {
    if (!isDeleteModalOpen || !artworkToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`${themeStyles.cardBg} rounded-2xl w-full max-w-md border ${themeStyles.borderColor} shadow-2xl`}>
          {/* Header */}
          <div className={`border-b ${themeStyles.borderColor} px-6 py-4 flex justify-between items-center`}>
            <h3 className="text-xl font-bold flex items-center gap-2 text-red-600">
              <FaExclamationTriangle />
              Delete Artwork
            </h3>
            <button
              onClick={closeModals}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                <FaTrash />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{artworkToDelete.title}</h4>
                <p className={themeStyles.mutedText}>by {artworkToDelete.artist}</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this artwork? This action cannot be undone and all associated data will be permanently removed.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModals}
                disabled={modalLoading}
                className={`px-6 py-3 border cursor-pointer ${themeStyles.borderColor} ${themeStyles.textColor} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteArtwork}
                disabled={modalLoading}
                className="bg-red-600 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {modalLoading ? 'Deleting...' : (
                  <>
                    <FaTrash />
                    Delete Artwork
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Artwork Modal (Create/View/Edit)
  const renderArtworkModal = () => {
    const modalConfig = {
      create: { 
        isOpen: isCreateModalOpen, 
        title: 'Create New Artwork', 
        action: handleCreateArtwork,
        actionText: 'Create Artwork'
      },
      view: { 
        isOpen: isViewModalOpen, 
        title: 'Artwork Details', 
        action: null,
        actionText: ''
      },
      edit: { 
        isOpen: isEditModalOpen, 
        title: 'Edit Artwork', 
        action: handleUpdateArtwork,
        actionText: 'Update Artwork'
      }
    };

    const currentModal = isCreateModalOpen ? modalConfig.create : 
                        isViewModalOpen ? modalConfig.view : 
                        modalConfig.edit;

    if (!currentModal.isOpen) return null;

    const artwork = isViewModalOpen ? selectedArtwork : newArtwork;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`${themeStyles.cardBg} rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border ${themeStyles.borderColor} shadow-2xl`}>
          {/* Header */}
          <div className={`border-b ${themeStyles.borderColor} px-6 py-4 flex justify-between items-center sticky top-0 ${themeStyles.cardBg}`}>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FaPalette className="text-amber-500" />
              {currentModal.title}
            </h3>
            <button
              onClick={closeModals}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Image & Basic Info */}
              <div className="space-y-6">
                {/* Image Upload/Preview */}
                <div className={`border-2 border-dashed ${themeStyles.borderColor} rounded-xl p-8 text-center`}>
                  <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className={themeStyles.mutedText}>Artwork Image</p>
                  <p className="text-sm text-gray-400 mt-2">Click to upload or drag and drop</p>
                </div>

                {/* Quick Stats */}
                {isViewModalOpen && selectedArtwork && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`text-center p-4 rounded-lg ${themeStyles.secondaryBg}`}>
                      <div className="text-2xl font-bold text-blue-500">{selectedArtwork.views}</div>
                      <div className={themeStyles.mutedText}>Views</div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${themeStyles.secondaryBg}`}>
                      <div className="text-2xl font-bold text-red-500">{selectedArtwork.likes}</div>
                      <div className={themeStyles.mutedText}>Likes</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Artwork Title</label>
                  <input
                    type="text"
                    value={artwork?.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    disabled={isViewModalOpen}
                    className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                    placeholder="Enter artwork title"
                  />
                </div>

                {/* Artist */}
                <div>
                  <label className="block text-sm font-medium mb-2">Artist</label>
                  <input
                    type="text"
                    value={artwork?.artist || ''}
                    onChange={(e) => handleInputChange('artist', e.target.value)}
                    disabled={isViewModalOpen}
                    className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                    placeholder="Enter artist name"
                  />
                </div>

                {/* Price & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price ($)</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        value={artwork?.price || 0}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        disabled={isViewModalOpen}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={artwork?.status || 'AVAILABLE'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      disabled={isViewModalOpen}
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="SOLD">Sold</option>
                      <option value="RESERVED">Reserved</option>
                    </select>
                  </div>
                </div>

                {/* Category & Medium */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={artwork?.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      disabled={isViewModalOpen}
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                    >
                      <option value="">Select Category</option>
                      <option value="Painting">Painting</option>
                      <option value="Digital">Digital</option>
                      <option value="Photography">Photography</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Abstract">Abstract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Medium</label>
                    <input
                      type="text"
                      value={artwork?.medium || ''}
                      onChange={(e) => handleInputChange('medium', e.target.value)}
                      disabled={isViewModalOpen}
                      className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                      placeholder="e.g., Oil on Canvas"
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-medium mb-2">Dimensions</label>
                  <input
                    type="text"
                    value={artwork?.dimensions || ''}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    disabled={isViewModalOpen}
                    className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                    placeholder="e.g., 24' x 36'"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={artwork?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={isViewModalOpen}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${themeStyles.borderColor} ${themeStyles.inputBg} ${themeStyles.textColor} focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 resize-none`}
                    placeholder="Describe the artwork..."
                  />
                </div>

                {/* Featured Toggle */}
                {!isViewModalOpen && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={artwork?.featured || false}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                    />
                    <label className="text-sm font-medium">Feature this artwork</label>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {!isViewModalOpen && (
              <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModals}
                  disabled={modalLoading}
                  className={`px-6 py-3 border cursor-pointer ${themeStyles.borderColor} ${themeStyles.textColor} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50`}
                >
                  Cancel
                </button>
                <button
                  onClick={currentModal.action ?? undefined}
                  disabled={modalLoading}
                  className={`${themeStyles.buttonBg} text-white cursor-pointer px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50`}
                >
                  <FaCheck />
                  {modalLoading ? 'Saving...' : currentModal.actionText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Artworks Management</h1>
            <p className={`${themeStyles.mutedText} font-bold text-white`}>Manage your gallery&apos;s artwork collection</p>
          </div>
        </div>
        <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.borderColor} p-8 text-center`}>
          <p className={themeStyles.textColor}>Loading artworks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Artworks Management</h1>
          <p className={`${themeStyles.mutedText} font-bold text-white`}>Manage your gallery&apos;s artwork collection</p>
        </div>
        <button 
          onClick={openCreateModal}
          className={`${themeStyles.buttonBg} text-white px-4 py-2 cursor-pointer rounded-lg hover:opacity-90 transition-colors flex items-center gap-2`}
        >
          <FaPlus /> Add Artwork
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Artworks', value: artworks.length.toLocaleString(), color: 'text-amber-500' },
          { label: 'Available', value: artworks.filter(a => a.status === 'AVAILABLE').length, color: 'text-green-500' },
          { label: 'Featured', value: artworks.filter(a => a.featured).length, color: 'text-yellow-500' },
          { label: 'Total Value', value: `$${(artworks.reduce((sum, a) => sum + a.price, 0) / 1000).toFixed(1)}K`, color: 'text-blue-500' },
        ].map((stat, index) => (
          <div key={stat.label} className={`${themeStyles.cardBg} rounded-xl p-4 border ${themeStyles.borderColor}`}>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className={`text-sm ${themeStyles.mutedText}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <FaSearch className={`absolute left-3 top-3 ${themeStyles.mutedText}`} />
          <input
            type="text"
            placeholder="Search artworks by title or artist..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${themeStyles.inputBg} ${themeStyles.textColor} ${themeStyles.borderColor} border focus:outline-none focus:ring-2 focus:ring-amber-500`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${themeStyles.inputBg} ${themeStyles.textColor} ${themeStyles.borderColor} border focus:outline-none focus:ring-2 focus:ring-amber-500`}
        >
          <option value="all">All Categories</option>
          <option value="Painting">Painting</option>
          <option value="Digital">Digital</option>
          <option value="Photography">Photography</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Abstract">Abstract</option>
        </select>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${themeStyles.inputBg} ${themeStyles.textColor} ${themeStyles.borderColor} border focus:outline-none focus:ring-2 focus:ring-amber-500`}
        >
          <option value="all">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="RESERVED">Reserved</option>
        </select>
      </div>

      {/* Artworks Table */}
      <div className={`${themeStyles.cardBg} rounded-xl border ${themeStyles.borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={themeStyles.tableHeaderBg}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Artwork
                  {filteredArtworks.some(a => a.featured) && (
                    <FaStar className="inline ml-1 text-yellow-500 text-xs" title="Featured artworks appear first" />
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArtworks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <p className={themeStyles.mutedText}>No artworks found matching the current filters.</p>
                  </td>
                </tr>
              ) : (
                filteredArtworks.map((artwork) => (
                  <tr key={artwork.id} className={themeStyles.tableRowHover}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white relative">
                          <FaEye />
                          {artwork.featured && (
                            <div className="absolute -top-1 -right-1">
                              <FaStar className="text-yellow-300 text-xs" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {artwork.title}
                            {artwork.featured && <FaStar className="text-yellow-500 text-sm" />}
                          </div>
                          <div className={`text-sm ${themeStyles.mutedText}`}>{artwork.medium}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{artwork.artist}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${themeStyles.mutedText} border ${themeStyles.borderColor}`}>
                        {artwork.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">${artwork.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(artwork.status)}`}>
                        {formatStatus(artwork.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <FaEye className="text-blue-500" /> {artwork.views}
                        </span>
                        <span className="flex items-center gap-1 text-red-500">
                          <FaHeart /> {artwork.likes}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditModal(artwork)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" 
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => openViewModal(artwork)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" 
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleToggleFeatured(artwork)}
                          className={`p-2 rounded-lg transition-colors ${
                            artwork.featured 
                              ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' 
                              : 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                          }`} 
                          title={artwork.featured ? "Unfeature" : "Feature"}
                        >
                          <FaStar className={artwork.featured ? "fill-current" : ""} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(artwork)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modals */}
      {renderArtworkModal()}
      {renderDeleteModal()}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}