import { useTranslation } from '../../i18n/client'
import ToolbarBase, { ToolbarProps } from './toolbarBase'

export const Toolbar = ({ selectedTool, setSelectedTool, lng }: ToolbarProps) => {
  const { t } = useTranslation(lng, 'common', {})
  return <ToolbarBase t={t} lng={lng} selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
}