import TableHeader from './TableHeader';
import { shallow } from 'enzyme';


describe('TableHeader component', () => {
  const headings = ["id","name","path"]

  test('TableHeader component should match snapshot', () => {
    const component = shallow(<TableHeader tableHeadings={headings} />);
    expect(component).toMatchSnapshot();
  });

  test('TableHeader should not have id visible in heading and length should be equal to heading ', () => {
    const component = shallow(<TableHeader tableHeadings={headings} />);
    const tableHeadings = component.find("th");

    expect(tableHeadings.at(0).text()).toBe("")
    expect(tableHeadings.length).toBe(headings.length)
  });
});
