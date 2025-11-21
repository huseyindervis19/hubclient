import type {
  Language,
  CategoriesResponse,
  ProductsResponse,
  ProductDetailsResponse,
  AboutUsResponse,
  HomeSliderResponse,
  ContactInfoResponse,
  TranslationsResponse,
} from '@/lib/types'

// Import mock data

import homeSliderData from '@/lib/mock/home-slider.json'
import contactInfoData from '@/lib/mock/contact-info.json'
import aboutUsData from '@/lib/mock/about-us.json'
import translationsData from '@/lib/mock/translations.json'

// Simulated API delay for realistic behavior
const API_DELAY = 300

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))






/**
 * About Us Service
 */
export async function getAboutUs(lang: Language): Promise<AboutUsResponse> {
  await delay(API_DELAY)
  
  return aboutUsData as AboutUsResponse
}

/**
 * Home Slider Service
 */
export async function getHomeSlider(lang: Language): Promise<HomeSliderResponse> {
  await delay(API_DELAY)
  
  return homeSliderData as HomeSliderResponse
}

/**
 * Contact Info Service
 */
export async function getContactInfo(lang: Language): Promise<ContactInfoResponse> {
  await delay(API_DELAY)
  
  return contactInfoData as ContactInfoResponse
}

/**
 * Translations Service
 */
export async function getTranslations(lang: Language): Promise<TranslationsResponse> {
  await delay(API_DELAY)
  
  return translationsData as TranslationsResponse
}
