import React, {useEffect, useState} from 'react'
import Anime from 'react-anime';
import { useSelector, useDispatch } from 'react-redux'
import { Schedule } from '../../component'
import { schedule } from '../../action'

const ListSchedule = ({setShow, setMessage, setTitle, setVariantType}) => {
    const dispatch = useDispatch()
    const schSeletor = useSelector(state => state.schedule)
    const accSeletor = useSelector(state => state.account)
    // const [list, setList] = useState(schSeletor.scheduleList)

    useEffect(
        () => {
            let payload = {
                userId: accSeletor.userId,
                token: accSeletor.token
            }

            dispatch(schedule.getSchedulesToDb(payload))
        },[]
    )  

    const List = () => {
        if(schSeletor.scheduleList){
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
                <div>{'You have not current schedules'}</div>
            )
        }
    }

    if(schSeletor.schedulesLoading){
        return (
            <Anime easing="easeOutElastic"
                   duration={1000}
                   direction="alternate"
                   loop={true}
                   delay={(el, index) => index * 240}
                   translateX='13rem'
                   scale={[.75, .9]}>
              <div className="blue"/>
              <div className="green"/>
              <div className="red"/>
            </Anime>
          )
    }

    return (
        <List />
    )
}

export default ListSchedule