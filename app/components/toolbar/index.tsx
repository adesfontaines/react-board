import { useTranslation } from '../../i18n'
import ToolbarBase from './toolbarBase'

export const Toolbar = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'footer')
  return <ToolbarBase t={t} lng={lng} />
}