import TableRow from './TableRow';
import { mount } from 'enzyme';
import { TableData } from '../../data/data';


describe('TableRow component', () => {
  const mockData: TableData[] = [
    { id: "mockedId", device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' },
    { id: "mockedId1", device: 'Device 2', path: '/path/2', name: 'jui2', status: 'available' }

  ];

  const onSelectRow = jest.fn()
  const rowData = mockData[0];
  const tableHeadings = Object.keys(mockData[0]);

  test('TableRow component should match snapshot', () => {
    const component = mount(<TableRow onSelectRow={onSelectRow} tableHeadings={tableHeadings} isSelected={false} rowData = {rowData}/>);
    expect(component).toMatchSnapshot();
  });

  test('TableRow Checkbox on click select rows when checked and remove rows when unchecked', () => {
    const onSelectRow = jest.fn()
    const component = mount(<TableRow onSelectRow={onSelectRow} tableHeadings={tableHeadings} isSelected={false} rowData = {rowData}/>);
    const rowCheck = component.find("input");

    rowCheck.at(0).simulate('change', { target: { checked: true } });

    expect(rowCheck.length).toBe(1);
    expect(onSelectRow).toHaveBeenCalledWith(true, "mockedId")

    rowCheck.at(0).simulate('change', { target: { checked: false } });

    expect(onSelectRow).toHaveBeenLastCalledWith(false, "mockedId")
  });

  test('selectAll Checkbox on key Up select all rows when checked', () => {
    const onSelectRow = jest.fn()
    const component = mount(<TableRow onSelectRow={onSelectRow} tableHeadings={tableHeadings} isSelected={false} rowData = {rowData}/>);
    const rowCheck = component.find("input");

    rowCheck.at(0).simulate('keyup', { key: 'Enter', keyCode: 13, which: 13 });

    expect(rowCheck.length).toBe(1);
    expect(onSelectRow).toHaveBeenCalledWith(true, "mockedId");
  });
  
});
