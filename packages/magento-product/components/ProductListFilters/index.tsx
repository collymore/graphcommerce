import { ChipMenuProps } from '@graphcommerce/next-ui'
import React from 'react'
import { FilterTypes } from '../ProductListItems/filterTypes'
import FilterCheckboxType from './FilterCheckboxType'
import FilterEqualType from './FilterEqualType'
import FilterRangeType from './FilterRangeType'
import { ProductListFiltersFragment } from './ProductListFilters.graphql'

export type ProductFiltersProps = ProductListFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypes, ...chipMenuProps } = props

  return (
    <>
      {aggregations?.map((aggregation) => {
        if (!aggregation?.attribute_code || aggregation?.attribute_code === 'category_id')
          return null

        switch (filterTypes[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            if (
              aggregation.options?.[0]?.label === '0' ||
              aggregation.options?.[1]?.label === '0' ||
              aggregation.options?.[0]?.label === '1' ||
              aggregation.options?.[1]?.label === '1'
            ) {
              return (
                <FilterCheckboxType
                  key={aggregation.attribute_code}
                  {...aggregation}
                  {...chipMenuProps}
                />
              )
            }

            return (
              <FilterEqualType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )

          case 'FilterRangeTypeInput':
            return (
              <FilterRangeType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )
        }
        console.log('Filter not recognized', aggregation)
        return null // `FilterMatchTypeInput not ${aggregation.attribute_code}`
      })}
    </>
  )
}
