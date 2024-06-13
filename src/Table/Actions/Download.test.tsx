import Download from './Download';
import { shallow } from 'enzyme';
import { TableData } from '../../data/data';

describe('Download component', () => {
  const mockData: TableData[] = [
    { id: "mockedId", device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' }
  ];

  test('DownloadAction component should match snapshot', () => {
    const component = shallow(<Download downloadAbleData={mockData} />);
    expect(component).toMatchSnapshot();
  });

  test('Download Btn should be enable if selected row contains available status and on click should work as expected', () => {
    const component = shallow(<Download downloadAbleData={mockData} />);
    const btn = component.find("button.active");
    global.alert = jest.fn();
    btn.at(0).simulate('click');

    expect(btn.length).toBe(1);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith("Device: Device 1 Path: /path/1\n");
  });

  test('Download Btn should be enable if selected row contains available status and on keyup should work as expected', () => {
    const component = shallow(<Download downloadAbleData={mockData} />);
    const btn = component.find("button.active");
    global.alert = jest.fn();
    btn.simulate('keyup', { key: 'Enter', keyCode: 13, which: 13 });

    expect(btn.length).toBe(1);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith("Device: Device 1 Path: /path/1\n");
  });

  test('Download Btn should be disable if there is no selected row ', () => {
    const component = shallow(<Download downloadAbleData={[]} />);
    const selectAllCheckbox = component.find("button");

    expect(selectAllCheckbox.at(0).prop("disabled")).toBe(true);
  });

  
});
