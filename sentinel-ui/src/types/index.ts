export interface SystemInfo {
  os: string;
  node: string;
  release: string;
  machine: string;
}

export interface CpuData {
  usage_percent: number;
  cores_logical: number;
  cores_physical: number;
}

export interface MemoryData {
  total_gb: number;
  used_percent: number;
  available_gb: number;
}

export interface SystemStatusResponse {
  timestamp: string;
  runtime_environment: string;
  system_info: SystemInfo;
  cpu: CpuData;
  memory: MemoryData;
}

export interface ChartDataPoint {
  time: string;
  cpu: number;
  mem: number;
}
