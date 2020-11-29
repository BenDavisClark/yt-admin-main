export interface YtEditorProps {
  /** 值 */
  value?: any
  /** change 事件监听 */
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}
