import TableCaption from './TableCaption';
import { mount, shallow } from 'enzyme';
import { TableData } from '../../data/data';

describe('Table component', () => {
  const mockData: TableData[] = [
    { id: "mockedId", device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' }
  ];

  const selectedRowIds = ["mockedId"];
  const setSelectedRowIds = jest.fn()
  const selectAll = true;
  const tableData = mockData;

  test('TableCaption component should match snapshot', () => {
    const component = shallow(<TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} selectAll={selectAll} tableData={tableData} />);
    expect(component).toMatchSnapshot();
  });

  test('selectAllCheckbox should be present with checked true if all is selected', () => {
    const component = mount(<TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} selectAll={selectAll} tableData={tableData} />);
    const selectAllCheckbox = component.find("input");

    expect(selectAllCheckbox.length).toBe(1);
    expect(selectAllCheckbox.at(0).prop('checked')).toBeTruthy();
  });

  test('selectAllCheckbox should be present with checked false if all is not selected', () => {
    const component = mount(<TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} selectAll={false} tableData={tableData} />);
    const selectAllCheckbox = component.find("input");

    expect(selectAllCheckbox.length).toBe(1);
    expect(selectAllCheckbox.at(0).prop('checked')).toBeFalsy();
  });

  test('select count should show Selected 1 when 1 row is selected ', () => {
    const component = mount(<TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} selectAll={false} tableData={tableData} />);    
    const selectedText = component.find("span.selected-text");

    expect(selectedText.at(0).text()).toBe("Selected 1");
  });

  test('select count should show None Selected when 0 row is selected ', () => {
    const component = mount(<TableCaption selectedRowIds={[]} setSelectedRowIds={setSelectedRowIds} selectAll={false} tableData={tableData} />);    
    const selectedText = component.find("span.selected-text");

    expect(selectedText.at(0).text()).toBe("None Selected");
  });


  test('Download btn should be enabled when available status row is selected ', () => {
    const component = mount(<TableCaption selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} selectAll={false} tableData={tableData} />);    
    const downloadBtn = component.find("button.active");

    expect(downloadBtn.at(0).prop("disabled")).toBeFalsy();
  });

  test('Download btn should be disabled when available status row is selected ', () => {
    const component = mount(<TableCaption selectedRowIds={["abc"]} setSelectedRowIds={setSelectedRowIds} selectAll={false} tableData={tableData} />);    
    const downloadBtn = component.find("button");

    expect(downloadBtn.at(0).prop("disabled")).toBeTruthy();
  });

});
