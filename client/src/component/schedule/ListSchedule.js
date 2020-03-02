import React from 'react'
import { useSelector } from 'react-redux'
import { Schedule } from '../../component'

const ListSchedule = ({setShow, setMessage, setTitle, setVariantType}) => {
    const schSeletor = useSelector(state => state.schedule)

    const List = () => {
        if(schSeletor.scheduleList.length > 0){
            return (
                <div>
                    {schSeletor.scheduleList
                        .map(item => (
                            <Schedule
                                key={item._id}
                                item={item}
                                setShow={setShow}
                                setMessage={setMessage}
                                setTitle={setTitle}
                                setVariantType={setVariantType}
                            />
                        ))
                    }
                </div>
            )
        } else {
            return (
                <div className='addWrapper'>
                    {'You have not current schedules'}
                </div>
            )
        }
    }

    return (
        <List />
    )
}

export default ListSchedule