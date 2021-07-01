import React from 'react'
import { useActions, useValues } from 'kea'
import { Radio } from 'antd'
import { ChartDisplayType } from '~/types'
import { chartFilterLogic } from 'lib/components/ChartFilter/chartFilterLogic'

interface ToggleButtonChartFilterProps {
    onChange?: (chartFilter: ChartDisplayType) => void
    disabled?: boolean
}

const noop = (): void => {}

export function ToggleButtonChartFilter({
    onChange = noop,
    disabled = false,
}: ToggleButtonChartFilterProps): JSX.Element {
    const { chartFilter } = useValues(chartFilterLogic)
    const { setChartFilter } = useActions(chartFilterLogic)
    const defaultDisplay = ChartDisplayType.FunnelViz

    const options = [
        {
            value: ChartDisplayType.FunnelViz,
            label: 'Funnel conversion',
        },
        {
            value: ChartDisplayType.ActionsLineGraphLinear,
            label: 'Conversion trend',
        },
    ]

    return (
        <Radio.Group
            key="2"
            defaultValue={defaultDisplay}
            value={chartFilter || defaultDisplay}
            onChange={({ target: { value } }: { target: { value?: ChartDisplayType } }) => {
                if (value) {
                    setChartFilter(value)
                    onChange(value)
                }
            }}
            data-attr="chart-filter"
            disabled={disabled}
            options={options}
            optionType="button"
        />
    )
}