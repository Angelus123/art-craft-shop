import { motion } from 'framer-motion';
import { FaChartLine, FaShoppingBag, FaUserPlus, FaPalette, FaStar, FaEye, FaHeart } from 'react-icons/fa';

interface ThemeStyles {
  cardBg: string;
  borderColor: string;
  mutedText: string;
  linkColor: string;
}

interface DashboardOverviewProps {
  themeStyles: ThemeStyles;
}

export default function DashboardOverview({ themeStyles }: DashboardOverviewProps) {
  const recentActivities = [
    { 
      action: 'New artwork published', 
      user: 'Maria Rodriguez', 
      time: '2 hours ago',
      type: 'artwork',
      artwork: 'Sunset Dreams'
    },
    { 
      action: 'Order completed', 
      user: 'John Smith', 
      time: '4 hours ago',
      type: 'order',
      amount: '$2,500'
    },
    { 
      action: 'New artist joined', 
      user: 'Alex Chen', 
      time: '6 hours ago',
      type: 'artist',
      specialty: 'Digital Art'
    },
    { 
      action: 'Collection updated', 
      user: 'Sarah Wilson', 
      time: '1 day ago',
      type: 'collection',
      collection: 'Emerging Artists'
    },
  ];

  const topArtworks = [
    { title: 'Ocean Waves', artist: 'Sarah Chen', views: 1567, likes: 124, price: 3200 },
    { title: 'Sunset Dreams', artist: 'Maria Rodriguez', views: 1247, likes: 89, price: 2500 },
    { title: 'Mountain Peak', artist: 'Robert Kim', views: 734, likes: 45, price: 2750 },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Today Sales', value: '$2,450', change: '+12%', icon: <FaShoppingBag />, color: 'text-green-500' },
          { label: 'New Artists', value: '5', change: '+8%', icon: <FaUserPlus />, color: 'text-blue-500' },
          { label: 'Artworks Added', value: '23', change: '+15%', icon: <FaPalette />, color: 'text-amber-500' },
          { label: 'Total Views', value: '1.2K', change: '+22%', icon: <FaChartLine />, color: 'text-purple-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.borderColor} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeStyles.mutedText}`}>{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} mt-1`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`text-3xl ${stat.color} bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.borderColor}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <button className={`text-sm ${themeStyles.linkColor} hover:underline`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-amber-50/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                  activity.type === 'artwork' ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                  activity.type === 'order' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                  activity.type === 'artist' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                  'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                  {activity.type === 'artwork' && <FaPalette />}
                  {activity.type === 'order' && <FaShoppingBag />}
                  {activity.type === 'artist' && <FaUserPlus />}
                  {activity.type === 'collection' && <FaStar />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className={`text-sm ${themeStyles.mutedText}`}>
                    by {activity.user}
                    {activity.artwork && ` • ${activity.artwork}`}
                    {activity.amount && ` • ${activity.amount}`}
                    {activity.specialty && ` • ${activity.specialty}`}
                    {activity.collection && ` • ${activity.collection}`}
                  </p>
                </div>
                <span className={`text-sm ${themeStyles.mutedText}`}>{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Performing Artworks */}
        <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.borderColor}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Performing Artworks</h3>
            <button className={`text-sm ${themeStyles.linkColor} hover:underline`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-amber-50/50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-700 dark:to-orange-700 rounded-lg flex items-center justify-center">
                  <FaPalette className="text-amber-600 dark:text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{artwork.title}</p>
                      <p className={`text-sm ${themeStyles.mutedText}`}>by {artwork.artist}</p>
                    </div>
                    <p className="font-bold text-amber-600">${artwork.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <FaEye className="text-blue-500" /> {artwork.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" /> {artwork.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={`${themeStyles.cardBg} rounded-2xl p-6 border ${themeStyles.borderColor}`}>
        <h3 className="text-lg font-semibold mb-6">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', color: 'text-green-500' },
            { label: 'Avg. Order Value', value: '$1,240', change: '+$120', color: 'text-blue-500' },
            { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', color: 'text-amber-500' },
          ].map((metric, index) => (
            <div key={metric.label} className="text-center p-4">
              <div className={`text-2xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
              <div className={`text-sm ${themeStyles.mutedText} mb-1`}>{metric.label}</div>
              <div className={`text-xs ${metric.color}`}>{metric.change} from last month</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}