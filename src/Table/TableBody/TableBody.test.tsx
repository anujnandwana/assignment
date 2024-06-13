import { mount, shallow } from 'enzyme';
import { TableData } from '../../data/data';
import TableRow from '../TableRow/TableRow';
import TableBody from './TableBody';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-id'),
}));

describe('TableBody component', () => {
  const mockData: TableData[] = [
    { id: "mockedId", device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' }
  ];

  const selectedRowIds = ["mockedId"];
  const setSelectedRowIds = jest.fn()
  const tableData = mockData;

  test('TableBody component should match snapshot', () => {
    const heading = Object.keys(mockData[0])
    const component = shallow(<TableBody selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} tableHeadings={heading} tableData={tableData} />);
    expect(component).toMatchSnapshot();
  });

  test('Row checkbox should have set the Ids when selected', () => {
    const heading = Object.keys(mockData[0]);
    const selectedRowIds:string[] = [];
    const setSelectedRowIds = jest.fn()
    const component = mount(<TableBody selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} tableHeadings={heading} tableData={tableData} />);
    const selectBox = component.find("input");
    selectBox.at(0).simulate('change', { target: { checked: true } });

    expect(setSelectedRowIds).toHaveBeenCalledWith(["mockedId"]);
  });


  test('Row checkbox should have unset the Ids when deselect', () => {
    const heading = Object.keys(mockData[0]);
    const selectedRowIds:string[] = [];
    const setSelectedRowIds = jest.fn()
    const component = mount(<TableBody selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} tableHeadings={heading} tableData={tableData} />);
    const selectBox = component.find("input");
    selectBox.at(0).simulate('change', { target: { checked: true } });
    selectBox.at(0).simulate('change', { target: { checked: false } });

    expect(setSelectedRowIds).toHaveBeenCalledWith([]);
  });

  test('should have shown same no of rows as tableData ', () => {
    const heading = Object.keys(mockData[0]);
    const selectedRowIds:string[] = [];
    const setSelectedRowIds = jest.fn()
    const component = mount(<TableBody selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} tableHeadings={heading} tableData={tableData} />);
    const rows = component.find(TableRow);
    
    expect(rows.length).toBe(tableData.length);
  });

});
