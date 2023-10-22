import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='font-luxurious'>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;