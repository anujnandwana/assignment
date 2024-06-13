import SelectedText from './SelectedText';
import { mount } from 'enzyme';

describe('SelectedText component', () => {
  const selectedRowIds = ["mockedId"];

  test('SelectedText component should match snapshot', () => {
    const component = mount(<SelectedText selectedRowIds={selectedRowIds} />);
    expect(component).toMatchSnapshot();
  });

  test('select count should show Selected 1 when 1 row is selected ', () => {
    const component = mount(<SelectedText selectedRowIds={selectedRowIds} />);
    const selectedText = component.find("span.selected-text");

    expect(selectedText.at(0).text()).toBe("Selected 1");
  });

  test('select count should show None Selected when 0 row is selected ', () => {
    const component = mount(<SelectedText selectedRowIds={[]} />);
    const selectedText = component.find("span.selected-text");

    expect(selectedText.at(0).text()).toBe("None Selected");
  });

});
