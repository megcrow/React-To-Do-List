import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{ shallow } from 'enzyme';

import RandomDog from '../components/RandomDog/RandomDog';
import mockImage from '../__mockData__/mockImage.jpg'

Enzyme.configure({ adapter: new Adapter() })

describe('RandomDog', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <RandomDog />
        );
    });

    test('RandomDog component should match snapshot', () => {
        expect('wrapper').toMatchSnapshot();
    });

    test('should say `Loading...` when loading is true', () => {
        wrapper.setProps({isLoadingDog: true})
        expect(
            wrapper.find('.loading-text').text()
        ).toBe('Loading...');
    });

    test('should show image when loading is false', () => {
        wrapper.setProps({dogUrl: mockImage, isLoadingDog: false})
        expect(
            wrapper.contains(<img src={mockImage} alt="header" className="header-img"/>)
        ).toBe(true);
    });
})
