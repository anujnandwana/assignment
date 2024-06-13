import Table from './Table';
import { mount } from 'enzyme';

import { TableData } from '../data/data';

import TableCaption from "../Table/TableCaption/TableCaption"
import TableBody from './TableBody/TableBody';
import TableHeader from './TableHeader/TableHeader';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-id'),
}));


describe('Table component', () => {
  const mockData: TableData[] = [
    { device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' }
  ];

  test('Table component should match snapshot', () => {
    const component = mount(<Table data={mockData} />);
    expect(component).toMatchSnapshot();
  });

  test('Selected component should have no selected id if not selected ', () => {
    const component = mount(<Table data={mockData} />);
    const tableCaption = component.find(TableCaption);

    expect(tableCaption.length).toBe(1)
    expect(tableCaption.at(0).prop('selectedRowIds').length).toBe(0)
  });

  test('TableHeader should have proper header according to the data with unique Id', () => {
    const component = mount(<Table data={mockData} />);
    const tableHeader = component.find(TableHeader);

    const updatedData = ["id", ...Object.keys(mockData[0])]


    expect(tableHeader.length).toBe(1)
    expect(tableHeader.at(0).prop('tableHeadings')).toStrictEqual(updatedData)
  });
});
