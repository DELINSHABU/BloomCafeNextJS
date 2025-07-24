import menuData from '../menu.json'

export interface MenuItem {
  itemNo: string
  name: string
  rate: string
}

export interface MenuItemWithAvailability extends MenuItem {
  available: boolean
  originalRate: string
}

export interface MenuCategory {
  category: string
  products: MenuItem[]
}

export interface MenuCategoryWithAvailability extends Omit<MenuCategory, 'products'> {
  category: string
  products: MenuItemWithAvailability[]
}

// In-memory storage for menu availability (in a real app, this would be in a database)
let menuAvailability: { [itemNo: string]: { available: boolean; currentRate: string } } = {}

export const getMenuData = (): MenuCategory[] => {
  return menuData.menu
}

export const getMenuCategories = (): string[] => {
  return menuData.menu.map(category => category.category)
}

export const getItemsByCategory = (categoryName: string): MenuItem[] => {
  const category = menuData.menu.find(cat => cat.category === categoryName)
  return category ? category.products : []
}

export const getAllItems = (): MenuItem[] => {
  return menuData.menu.flatMap(category => category.products)
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

// Menu availability management functions
export const getMenuDataWithAvailability = (): MenuCategoryWithAvailability[] => {
  return menuData.menu.map(category => ({
    ...category,
    products: category.products.map(item => ({
      ...item,
      available: menuAvailability[item.itemNo]?.available ?? true,
      originalRate: item.rate,
      rate: menuAvailability[item.itemNo]?.currentRate ?? item.rate
    }))
  }))
}

export const getAvailableItems = (): MenuItemWithAvailability[] => {
  return getMenuDataWithAvailability()
    .flatMap(category => category.products)
    .filter(item => item.available)
}

export const getPopularAvailableItems = (): MenuItemWithAvailability[] => {
  const popularCategories = ['AL FAHAM', 'BIRIYANI', 'MOJITTO', 'SHAKES']
  const popularItems: MenuItemWithAvailability[] = []
  
  const menuWithAvailability = getMenuDataWithAvailability()
  
  popularCategories.forEach(categoryName => {
    const category = menuWithAvailability.find(cat => cat.category === categoryName)
    if (category) {
      const availableItems = category.products.filter(item => item.available)
      popularItems.push(...availableItems.slice(0, 2))
    }
  })
  
  return popularItems
}

export const updateItemAvailability = (itemNo: string, available: boolean) => {
  if (!menuAvailability[itemNo]) {
    const originalItem = getAllItems().find(item => item.itemNo === itemNo)
    menuAvailability[itemNo] = {
      available,
      currentRate: originalItem?.rate || '0'
    }
  } else {
    menuAvailability[itemNo].available = available
  }
}

export const updateItemPrice = (itemNo: string, newRate: string) => {
  if (!menuAvailability[itemNo]) {
    menuAvailability[itemNo] = {
      available: true,
      currentRate: newRate
    }
  } else {
    menuAvailability[itemNo].currentRate = newRate
  }
}

export const isItemAvailable = (itemNo: string): boolean => {
  return menuAvailability[itemNo]?.available ?? true
}

export const getCurrentPrice = (itemNo: string): string => {
  const originalItem = getAllItems().find(item => item.itemNo === itemNo)
  return menuAvailability[itemNo]?.currentRate ?? originalItem?.rate ?? '0'
}

export const addNewMenuItem = (categoryName: string, item: MenuItem) => {
  // In a real app, this would update the database
  // For now, we'll just add it to the availability system
  menuAvailability[item.itemNo] = {
    available: true,
    currentRate: item.rate
  }
}