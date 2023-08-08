'use client'

import { useTranslation } from '../../i18n/client'
import ToolbarBase from './toolbarBase'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'common')
  return <ToolbarBase t={t} lng={lng} />
}