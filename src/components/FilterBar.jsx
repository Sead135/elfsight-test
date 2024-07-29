import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from 'styled-components'

import {
  genderOptions,
  speciesOptions,
  statusOptions,
  typeOptions,
} from '../utils'

export const FilterBar = ({ setFilterSettings }) => {
  const [filters, setFilters] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showDetailFilter, setShowDetailFilter] = useState({
    type: false,
    status: false,
    species: false,
    gender: false,
  })

  const handleOpenFilter = (type) => {
    const newShowFilter = JSON.parse(JSON.stringify(showDetailFilter))
    Object.keys(newShowFilter).forEach((key) => {
      newShowFilter[key] = false
    })
    newShowFilter[type] = !showDetailFilter[type]
    setShowDetailFilter(newShowFilter)
  }

  const chooseFilter = ({ type, value }) => {
    handleOpenFilter(type)
    const newFilters = filters.filter((filter) => filter.type !== type)
    setFilters([...newFilters, { type, value }])
  }

  const clearAllFilters = () => {
    setFilters([])
    setSearchValue('')
    setFilterSettings('clear-all')
  }

  useEffect(() => {
    setFilterSettings(filters)
  }, [filters])

  return (
    <Container>
      <Filter>
        <FilterOptions>
          <FilterType>
            <FilterButton onClick={() => handleOpenFilter('type')}>
              Type
            </FilterButton>
            <FilterPopup $show={showDetailFilter.type}>
              {typeOptions.map((option) => (
                <FilterItem
                  key={option.name}
                  $select={filters.find(
                    (filter) =>
                      filter.type === 'type' && filter.value === option.value
                  )}
                  onClick={() =>
                    chooseFilter({ type: 'type', value: option.value })
                  }
                >
                  {option.name}
                </FilterItem>
              ))}
            </FilterPopup>
          </FilterType>

          <FilterStatus>
            <FilterButton onClick={() => handleOpenFilter('status')}>
              Status
            </FilterButton>
            <FilterPopup $show={showDetailFilter.status}>
              {statusOptions.map((option) => (
                <FilterItem
                  key={option.name}
                  $select={filters.find(
                    (filter) =>
                      filter.type === 'status' && filter.value === option.value
                  )}
                  onClick={() =>
                    chooseFilter({ type: 'status', value: option.value })
                  }
                >
                  {option.name}
                </FilterItem>
              ))}
            </FilterPopup>
          </FilterStatus>

          <FilterSpecies>
            <FilterButton onClick={() => handleOpenFilter('species')}>
              Species
            </FilterButton>
            <FilterPopup $show={showDetailFilter.species}>
              {speciesOptions.map((option) => (
                <FilterItem
                  key={option.name}
                  $select={filters.find(
                    (filter) =>
                      filter.type === 'species' && filter.value === option.value
                  )}
                  onClick={() =>
                    chooseFilter({ type: 'species', value: option.value })
                  }
                >
                  {option.name}
                </FilterItem>
              ))}
            </FilterPopup>
          </FilterSpecies>

          <FilterGender>
            <FilterButton onClick={() => handleOpenFilter('gender')}>
              Gender
            </FilterButton>
            <FilterPopup $show={showDetailFilter.gender}>
              {genderOptions.map((option) => (
                <FilterItem
                  key={option.name}
                  $select={filters.find(
                    (filter) =>
                      filter.type === 'gender' && filter.value === option.value
                  )}
                  onClick={() =>
                    chooseFilter({ type: 'gender', value: option.value })
                  }
                >
                  {option.name}
                </FilterItem>
              ))}
            </FilterPopup>
          </FilterGender>

          {filters.length !== 0 && (
            <FilterButton onClick={clearAllFilters} style={{ color: 'red' }}>
              Clear All
            </FilterButton>
          )}
        </FilterOptions>

        <FilterName>
          <input
            value={searchValue}
            type="text"
            placeholder="Enter query..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FilterButton
            onClick={() => chooseFilter({ type: 'name', value: searchValue })}
          >
            Search
          </FilterButton>
        </FilterName>
      </Filter>
    </Container>
  )
}

const Container = styled.div`
  width: calc(100% - 40px);
  padding: 20px 0;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FilterType = styled.div``

const FilterStatus = styled.div``

const FilterSpecies = styled.div``

const FilterGender = styled.div``

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const FilterName = styled.div`
  display: flex;
  gap: 20px;

  input {
    height: 100%;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 0;
    font-size: 18px;
    max-width: 300px;
    width: 100%;
    box-sizing: border-box;
  }
`

const Filter = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

const FilterButton = styled.button`
  padding: 5px 20px;
  border: 2px solid #ffffff;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
`

const FilterPopup = styled.div`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  position: absolute;
  width: 200px;
  background-color: #ffffff;
  z-index: 10;
  padding: 20px 10px;
  margin-top: 10px;
  flex-direction: column;
  gap: 8px;
  border-radius: 5px;
`

const FilterItem = styled.div`
  cursor: pointer;
  ${({ $select }) =>
    $select &&
    `
    font-weight: 700;
    border: 1px solid #000000;
    border-radius: 5px;
    padding: 2px 5px;
  `}
`

FilterBar.propTypes = {
  setFilterSettings: PropTypes.func.isRequired,
}
