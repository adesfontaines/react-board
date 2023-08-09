import { useTranslation } from '../../i18n'
import ToolbarBase, { ToolbarProps } from './toolbarBase'

export const Toolbar = async ({ selectedTool, setSelectedTool, lng }: ToolbarProps) => {
  const { t } = await useTranslation(lng, 'common')
  return <ToolbarBase t={t} lng={lng} selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
}