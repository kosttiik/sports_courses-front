import { FC } from "react"
import { useSelector } from "react-redux"
import { Button, ListGroup, ListGroupItem, Form, FormGroup, FormSelect, FormControl } from "react-bootstrap"
import cartSlice from "./store/cartSlice"

import store, { useAppDispatch } from "./store/store"

interface InputChangeInterface {
    target: HTMLInputElement;
}

const EnrollPage: FC = () => {
    const dispatch = useAppDispatch()

    const {groups} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    const deleteFromCart = (groupTitle = '') => {
        return (event: React.MouseEvent) => {
            dispatch(cartSlice.actions.removeCourse(groupTitle))
            event.preventDefault()
        }
    }

    return (
        <>
            <h1>Запись на курс</h1>
            {groups?.length !== 0 &&
                <h3>Выбранные курсы:</h3>
            }
            {groups?.length === 0 && 
                <h4>Вы ещё не выбрали ни одного курса!</h4>
            }
            <ListGroup style={{width: '500px'}}>
                {groups?.map((groupTitle) => (
                    <ListGroupItem> {groupTitle}
                        <span className="pull-right button-group" style={{float: 'right'}}>
                            <Button variant="danger" onClick={deleteFromCart(groupTitle)}>Удалить</Button>
                        </span>
                    </ListGroupItem>
                ))
                }
            </ListGroup>
            <h4>Параметры бронирования:</h4>
            <Form style={{width: '500px'}}>
                <FormGroup>
                    <label htmlFor="statusInput">Статус</label>
                    <FormSelect id="statusInput">
                        <option>Черновик</option>
                        <option>Удалён</option>
                        <option>Сформирован</option>
                        <option>Завершён</option>
                        <option>Отклонён</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateCreatedInput">Дата создания</label>
                    <FormControl id="dateCreatedInput"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateProcessedInput">Дата обработки</label>
                    <FormControl id="dateProcessedInput"></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="dateFinishedInput">Дата завершения</label>
                    <FormControl id="dateFinishedInput"></FormControl>
                </FormGroup>
            </Form>
            <p></p>
            <Button>Записаться</Button>
            <p></p>
            <Button href="/sports_courses-front/">Домой</Button>
        </>
    )
}

export default EnrollPage
