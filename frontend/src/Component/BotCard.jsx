import { GoArrowRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Card from '../Common-Component/Box';

function BotCard() {

    return (
        <Card>
            <div className="p-4">
                <p className='text-xl font-medium text-blue-500 flex flex-start'>Get started</p>
                <p className='text-lg text-slate-500 font-normal flex flex-start'>Let&rsquo;s Create a bot</p>
            </div>
            <div className="py-5">
                <hr />
                <Link to={"/dashboard/createBot"}>
                    <div className="font-medium text-end flex justify-end items-center gap-2 px-5 mt-3 cursor-pointer hover:text-[#0F45F5]">
                        Continue <GoArrowRight className="custom-bold" />
                    </div>
                </Link>
            </div>
        </Card>
    )
}

export default BotCard