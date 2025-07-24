import menuData from '../menu.json'

export interface MenuItem {
  itemNo: string
  name: string
  rate: string
}

export interface MenuCategory {
  category: string
  products: MenuItem[]
}

export const getMenuData = (): MenuCategory[] => {
  return menuData.categories || menuData.menu || []
}

export const getMenuCategories = (): string[] => {
  const data = getMenuData()
  return data.map(category => category.category)
}

export const getItemsByCategory = (categoryName: string): MenuItem[] => {
  const data = getMenuData()
  const category = data.find(cat => cat.category === categoryName)
  return category ? category.products : []
}

export const getAllItems = (): MenuItem[] => {
  const data = getMenuData()
  return data.flatMap(category => category.products)
}

export const getPopularItems = (): MenuItem[] => {
  // Get some popular items from different categories
  const popularCategories = ['AL FAHAM', 'BIRIYANI', 'MOJITTO', 'SHAKES']
  const popularItems: MenuItem[] = []
  
  popularCategories.forEach(categoryName => {
    const items = getItemsByCategory(categoryName)
    if (items.length > 0) {
      // Take first 2 items from each popular category
      popularItems.push(...items.slice(0, 2))
    }
  })
  
  return popularItems
}

export const formatPrice = (rate: string): number => {
  if (rate === 'APS' || rate === 'none') {
    return 0 // Price on request
  }
  return parseInt(rate) || 0
}

export const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'Breakfast': '🍳',
    'Starter': '🥗',
    'HOT BEVERAGE': '☕',
    'SOUP': '🍲',
    'SALADS': '🥗',
    'BREADS': '🍞',
    'NADANKOOTTU': '🍛',
    'BIRIYANI': '🍚',
    'MEALS': '🍽️',
    'INDIAN RICE': '🍚',
    'AL FAHAM': '🍗',
    'VEG CURRY': '🍛',
    'NON INDIAN': '🍖',
    'SANDWICH': '🥪',
    'BEEF': '🥩',
    'SEAFOOD': '🦐',
    'GRILLED FISH': '🐟',
    'RICE AND NOODLES': '🍜',
    'VEG CHINESE': '🥢',
    'NON CHINESE': '🥢',
    'BURGER': '🍔',
    'MOJITTO': '🍹',
    'FLAVOR SODA': '🥤',
    'SHARJA': '🥤',
    'SHAKES': '🥤'
  }
  
  return iconMap[category] || '🍴'
}

// Simple function for getting menu data with availability (defaults to available)
export const getMenuDataWithAvailability = () => {
  const data = getMenuData()
  return data.map(category => ({
    ...category,
    products: category.products.map(item => ({
      ...item,
      available: true // Default all items to available
    }))
  }))
}