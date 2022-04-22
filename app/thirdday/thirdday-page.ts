import { View, ItemEventData, NavigatedData, Page } from '@nativescript/core'
import { thirddayModel } from './thirdday-view-model'
import { Item } from './shared/item'

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new thirddayModel()
}
