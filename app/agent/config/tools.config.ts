import { z } from 'zod';

// 工具配置接口
export interface ToolConfig<T = Record<string, unknown>> {
  name: string;
  description: string;
  enabled: boolean;
  schema: z.ZodSchema;
  handler: (params?: T) => Promise<string> | string;
  options?: Record<string, unknown>;
}

// 工具类型定义
interface CalculatorParams {
  expression: string;
}

interface WeatherParams {
  city: string;
}


interface SearchParams {
  query: string;
}

// 基础工具配置
export const toolsConfig: Record<string, ToolConfig> = {
  calculator: {
    name: 'calculator',
    description: '计算数学表达式',
    enabled: true,
    schema: z.object({
      expression: z.string().describe('要计算的数学表达式，例如 "2 + 3 * 4"'),
    }),
    handler: async (params?: CalculatorParams) => {
      if (!params) return '';
      const { expression } = params;
      try {
        // 简单的数学表达式计算（生产环境中应使用更安全的方法）
        const result = Function(`"use strict"; return (${expression})`)();
        return `计算结果: ${expression} = ${result}`;
      } catch {
        return `计算错误: 无法计算表达式 "${expression}"`;
      }
    },
  },

  weather: {
    name: 'weather',
    description: '查询指定城市的天气信息',
    enabled: true,
    schema: z.object({
      city: z.string().describe('要查询天气的城市名称'),
    }),
    handler: async (params?: WeatherParams) => {
      if (!params) return '';
      const { city } = params;
      // 模拟天气数据
      const weatherData = {
        北京: { temp: '15°C', condition: '晴天', humidity: '45%' },
        上海: { temp: '18°C', condition: '多云', humidity: '60%' },
        广州: { temp: '25°C', condition: '小雨', humidity: '80%' },
        深圳: { temp: '26°C', condition: '晴天', humidity: '55%' },
        杭州: { temp: '20°C', condition: '多云', humidity: '65%' },
        成都: { temp: '18°C', condition: '阴天', humidity: '70%' },
      };

      const weather = weatherData[city as keyof typeof weatherData] || {
        temp: '20°C',
        condition: '未知',
        humidity: '50%',
      };

      return `${city}的天气情况：\n🌡️ 温度：${weather.temp}\n☁️ 天气：${weather.condition}\n💧 湿度：${weather.humidity}`;
    },
    options: {
      // 可以配置API密钥、超时时间等
      timeout: 5000,
      apiKey: process.env.WEATHER_API_KEY,
    },
  },

  current_time: {
    name: 'current_time',
    description: '获取当前时间和日期',
    enabled: true,
    schema: z.object({}),
    handler: async (_params?: Record<string, never>) => {
      const now = new Date();
      return `当前时间: ${now.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
      })}`;
    },
  },

  search: {
    name: 'search',
    description: '搜索相关信息',
    enabled: true,
    schema: z.object({
      query: z.string().describe('搜索查询词'),
    }),
    handler: async (params?: SearchParams) => {
      if (!params) return '';
      const { query } = params;
      // 模拟搜索结果
      const searchResults = [
        `关于 "${query}" 的搜索结果：`,
        `1. ${query} 相关的最新信息...`,
        `2. ${query} 的详细解释和说明...`,
        `3. ${query} 的相关链接和资源...`,
        `\n💡 这是一个模拟的搜索功能，在实际应用中可以接入真实的搜索API。`,
      ];

      return searchResults.join('\n');
    },
    options: {
      maxResults: 5,
      searchEngine: 'mock', // 可以配置为 'google', 'bing', 'tavily' 等
      apiKey: process.env.SEARCH_API_KEY,
    },
  },
};

// 环境配置
export interface EnvironmentConfig {
  development: {
    enabledTools: string[];
    debugMode: boolean;
  };
  production: {
    enabledTools: string[];
    debugMode: boolean;
  };
  test: {
    enabledTools: string[];
    debugMode: boolean;
  };
}

export const environmentConfig: EnvironmentConfig = {
  development: {
    enabledTools: ['calculator', 'weather', 'current_time', 'search'],
    debugMode: true,
  },
  production: {
    enabledTools: ['calculator', 'weather', 'current_time', 'search'],
    debugMode: false,
  },
  test: {
    enabledTools: ['calculator', 'current_time'],
    debugMode: true,
  },
};

// 获取当前环境配置
export function getCurrentEnvironmentConfig() {
  const env = process.env.NODE_ENV || 'development';
  return (
    environmentConfig[env as keyof EnvironmentConfig] ||
    environmentConfig.development
  );
}

// 获取启用的工具配置
export function getEnabledToolsConfig(): Record<string, ToolConfig> {
  const envConfig = getCurrentEnvironmentConfig();
  const enabledTools: Record<string, ToolConfig> = {};

  for (const toolName of envConfig.enabledTools) {
    const toolConfig = toolsConfig[toolName];
    if (toolConfig && toolConfig.enabled) {
      enabledTools[toolName] = toolConfig;
    }
  }

  return enabledTools;
}

// 工具配置验证
export function validateToolConfig(config: ToolConfig): boolean {
  return !!(
    config.name &&
    config.description &&
    config.schema &&
    typeof config.handler === 'function' &&
    typeof config.enabled === 'boolean'
  );
}

// 动态添加工具配置
export function addToolConfig<T = Record<string, unknown>>(name: string, config: Omit<ToolConfig<T>, 'name'>) {
  const fullConfig: ToolConfig<T> = {
    name,
    ...config,
  };

  if (!validateToolConfig(fullConfig)) {
    throw new Error(`Invalid tool configuration for ${name}`);
  }

  toolsConfig[name] = fullConfig as ToolConfig;
}

// 禁用工具
export function disableTool(name: string) {
  if (toolsConfig[name]) {
    toolsConfig[name].enabled = false;
  }
}

// 启用工具
export function enableTool(name: string) {
  if (toolsConfig[name]) {
    toolsConfig[name].enabled = true;
  }
}
