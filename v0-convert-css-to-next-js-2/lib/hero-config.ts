
export interface ResponsiveConfig {
  cardWidth: number
  cardHeight: number
  fontSize: number
  subtitleSize: number
  vShapePositions: Array<{ top: string; left: string; rotation: number }>
}

class HeroConfiguration {
  private static instance: HeroConfiguration
  
  // Singleton Pattern: لضمان وجود نسخة واحدة فقط من الإعدادات
  private constructor() {}

  public static getInstance(): HeroConfiguration {
    if (!HeroConfiguration.instance) {
      HeroConfiguration.instance = new HeroConfiguration()
    }
    return HeroConfiguration.instance
  }

  // Encapsulation: حساب القيم بناءً على العرض يتم هنا فقط
  public getResponsiveValues(width: number): ResponsiveConfig {
    const isMobile = width < 768
    const isTablet = width < 1024

    return {
      cardWidth: isMobile ? 160 : isTablet ? 200 : 240,
      cardHeight: isMobile ? 200 : isTablet ? 250 : 300,
      fontSize: isMobile ? 48 : isTablet ? 72 : 96,
      subtitleSize: isMobile ? 18 : isTablet ? 24 : 30,
      vShapePositions: [
        { top: "22%", left: isMobile ? "85%" : isTablet ? "80%" : "78%", rotation: 15 },
        { top: "38%", left: isMobile ? "72%" : isTablet ? "68%" : "64%", rotation: 8 },
        { top: "55%", left: "50%", rotation: 0 },
        { top: "38%", left: isMobile ? "28%" : isTablet ? "32%" : "36%", rotation: -8 },
        { top: "22%", left: isMobile ? "15%" : isTablet ? "20%" : "22%", rotation: -15 },
      ],
    }
  }
}

export const heroConfig = HeroConfiguration.getInstance()
