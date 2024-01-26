import {Group} from './ds'
import axios from 'axios';

import basketballImage from '../assets/basketball.png'
import footballImage from '../assets/football.png'
import judoImage from '../assets/judo.png'

export const getGroupByTitle = async (groupTitle = ''): Promise<Group> => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios.get(
        '/api/group/' + String(groupTitle),
        config)
        .then((response) => response.data)
        .catch(() => {
            const offline_groups: Group[] =  [
                {
                    ID: 1,
                    Course: "Дзюдо",
                    Title: "Мастера татами",
                    Description: "Исследуйте искусство дзюдо с нами! Наши еженедельные занятия предлагают уникальное погружение в технику, тактику и философию дзюдо. Присоединяйтесь к нам для укрепления навыков, расширения знаний и создания сильного фундамента в мире дзюдо.",
                    Status: "Действует",
                    Capacity: 20,
                    Enrolled: 7,
                    CoachName: "Касаткин Александр Викторович",
                    CoachEmail: "kosatkin@bmstu.ru",
                    CoachPhone: "+7-915-156-01-22",
                    Schedule: "Четверг в 11:50",
                    ImageName: judoImage?.toString()
                },
                {
                    ID: 2,
                    Course: "Футбол",
                    Title: "Магия мяча",
                    Description: "Погрузитесь в захватывающий мир игры с нашим еженедельным футбольным курсом. Откройте для себя уникальные аспекты стратегии, тактики и командного взаимодействия, которые лежат в основе успеха на футбольном поле.",
                    Status: "Действует",
                    Capacity: 15,
                    Enrolled: 6,
                    CoachName: "Антонов Игорь Николаевич",
                    CoachEmail: "antonov_i@bmstu.ru",
                    CoachPhone: "+7-910-011-58-94",
                    Schedule: "Среда в 17:25",
                    ImageName: footballImage?.toString()
                },
                {
                    ID: 3,
                    Course: "Баскетбол",
                    Title: "Кубок высоты",
                    Description: "Поднимите свою игру на новый уровень с нашим еженедельным баскетбольным курсом. Вы разберетесь в стратегии, улучшите технику бросков и освоите ключевые аспекты командного взаимодействия.",
                    Status: "Действует",
                    Capacity: 34,
                    Enrolled: 29,
                    CoachName: "Коршунов Виктор Петрович",
                    CoachEmail: "korshunov@bmstu.ru",
                    CoachPhone: "+7-999-732-24-65",
                    Schedule: "Вторник в 9:00",
                    ImageName: basketballImage?.toString()
                },]

                for (let group of offline_groups) {
                    if (groupTitle == group.Title) {
                        return group
                    }
                }
            })
}
