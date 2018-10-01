import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, intlShape } from 'react-intl';
import {
  withFilter,
  filtersPaginationSelector,
  fetchFiltersAction,
  deleteFilterAction,
  filtersSelector,
  loadingSelector,
  DEFAULT_PAGE_SIZE,
} from 'controllers/filter';
import {
  userIdSelector,
  activeProjectSelector,
  activeProjectRoleSelector,
  userAccountRoleSelector,
} from 'controllers/user';
import { withPagination } from 'controllers/pagination';
import { PaginationToolbar } from 'components/main/paginationToolbar';
import { PageLayout, PageHeader, PageSection } from 'layouts/pageLayout';
import { showModalAction } from 'controllers/modal';
import { withSorting, SORTING_ASC } from 'controllers/sorting';
import {
  userFiltersSelector,
  toggleDisplayFilterOnLaunchesAction,
  deleteDisplayFilterOnLaunchesAction,
} from 'controllers/project';
import { fetch } from 'common/utils';
import { URLS } from 'common/urls';
import { NoFiltersBlock } from './noFiltersBlock';
import { FilterPageToolbar } from './filterPageToolbar';
import { FilterGrid } from './filterGrid';

const messages = defineMessages({
  filtersPageTitle: {
    id: 'FiltersPage.title',
    defaultMessage: 'Filters',
  },
});

@connect(
  (state) => ({
    userId: userIdSelector(state),
    url: URLS.filters(activeProjectSelector(state)),
    activeProject: activeProjectSelector(state),
    userFilters: userFiltersSelector(state),
    projectRole: activeProjectRoleSelector(state),
    accountRole: userAccountRoleSelector(state),
    filters: filtersSelector(state),
    loading: loadingSelector(state),
  }),
  {
    showModalAction,
    toggleDisplayFilterOnLaunches: toggleDisplayFilterOnLaunchesAction,
    deleteDisplayFilterOnLaunchesAction,
    fetchFiltersAction,
    deleteFilterAction,
  },
)
@withSorting({
  defaultSortingColumn: 'name',
  defaultSortingDirection: SORTING_ASC,
})
@withFilter
@withPagination({
  paginationSelector: filtersPaginationSelector,
})
@injectIntl
export class FiltersPage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object),
    activePage: PropTypes.number,
    itemCount: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangePageSize: PropTypes.func,
    userId: PropTypes.string,
    filter: PropTypes.string,
    activeProject: PropTypes.string,
    onFilterChange: PropTypes.func,
    fetchFiltersAction: PropTypes.func,
    showModalAction: PropTypes.func,
    projectRole: PropTypes.string,
    userFilters: PropTypes.arrayOf(PropTypes.string),
    accountRole: PropTypes.string,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    filters: [],
    activePage: 1,
    itemCount: 0,
    pageCount: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    userId: '',
    filter: '',
    activeProject: '',
    onFilterChange: () => {},
    onChangePage: () => {},
    onChangePageSize: () => {},
    fetchFiltersAction: () => {},
    showModalAction: () => {},
    projectRole: '',
    userFilters: [],
    accountRole: '',
    loading: false,
  };

  getBreadcrumbs = () => [{ title: this.props.intl.formatMessage(messages.filtersPageTitle) }];

  confirmDelete = (filter) =>
    this.props.showModalAction({
      id: 'filterDeleteModal',
      data: { filter, onConfirm: () => this.deleteFilter(filter.id) },
    });

  openEditModal = (filter) =>
    this.props.showModalAction({
      id: 'filterEditModal',
      data: { filter, onEdit: this.updateFilter },
    });

  updateFilter = (filter) =>
    fetch(URLS.filter(this.props.activeProject, filter.id), {
      method: 'put',
      data: filter,
    }).then(this.props.fetchFiltersAction);

  deleteFilter = (id) => {
    this.props.deleteDisplayFilterOnLaunchesAction;
    fetch(URLS.filter(this.props.activeProject, id), {
      method: 'delete',
    })
      .then()
      .then(this.props.fetchFiltersAction);
  };

  render() {
    const {
      filter,
      intl,
      onFilterChange,
      activePage,
      itemCount,
      pageCount,
      pageSize,
      onChangePage,
      onChangePageSize,
      filters,
      loading,
      ...rest
    } = this.props;
    return (
      <PageLayout title={intl.formatMessage(messages.filtersPageTitle)}>
        <PageHeader breadcrumbs={this.getBreadcrumbs()} />
        <PageSection>
          <FilterPageToolbar filter={filter} filters={filters} onFilterChange={onFilterChange} />
          <FilterGrid
            onEdit={this.openEditModal}
            onDelete={this.confirmDelete}
            filters={filters}
            loading={loading}
            {...rest}
          />
          {!filters.length && !loading && <NoFiltersBlock />}
          {filters &&
            !!filters.length && (
              <PaginationToolbar
                activePage={activePage}
                itemCount={itemCount}
                pageCount={pageCount}
                pageSize={pageSize}
                onChangePage={onChangePage}
                onChangePageSize={onChangePageSize}
              />
            )}
        </PageSection>
      </PageLayout>
    );
  }
}
