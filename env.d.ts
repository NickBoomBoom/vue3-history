import { ComponentCustomProperties } from "@vue/runtime-core";
import { History } from './interface'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $history: History; // 这里填类型
  }
}
// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;
