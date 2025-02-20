create database fishing_store;
use fishing_store;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    position ENUM('Admin', 'Customer') default 'Customer',
    phone_number VARCHAR(20) NOT NULL CHECK (phone_number LIKE '+%'),
    email VARCHAR(50) UNIQUE CHECK (email LIKE '%@%'),
	password VARCHAR(255) NOT NULL,
    INDEX idx_employee_f_name (first_name),
    INDEX idx_employee_l_name (last_name)
);

INSERT INTO Users (first_name, last_name, position, phone_number, email, password) 
VALUES 
('Admin', 'Admin', 'Admin', '+1234567890', 'admin@admin', '$2b$10$sEVwnJ5ugW.bTf8sVtt9Ze6J7rvCrkLUn/wRG.k0s5sdzo9Bkz.Z6'); 

-- Таблиця для категорій товарів
CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    INDEX idx_category_name (name)
);
INSERT INTO Category (name) VALUES
('Спінінги'),
('Котушки'),
('Приманки'),
('Аксесуари'),
('Гачки');


-- Таблиця для товарів
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    INDEX idx_products_price (price)
);

INSERT INTO Products (category_id, name, image_url, price) VALUES
(1, 'Спінінг Shimano', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 120.50),
(1, 'Спінінг Daiwa', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 135.75),
(1, 'Спінінг Abu Garcia', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 110.99),
(1, 'Фідерне вудилище Flagman', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 145.50),
(1, 'Фідерне вудилище Shimano', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 160.00),
(1, 'Фідерне вудилище Daiwa', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 155.25),
(1, 'Коропове вудилище Carp Pro', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 180.99),
(1, 'Телескопічне вудилище Kaida', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 75.80),
(1, 'Вудка для зимової риболовлі', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 40.25),
(1, 'Літня махова вудка', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 90.99),

(2, 'Котушка Daiwa Ninja', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 85.75),
(2, 'Котушка Shimano Ultegra', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 120.50),
(2, 'Котушка Abu Garcia Cardinal', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 95.30),
(2, 'Котушка Okuma Ceymar', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 79.99),
(2, 'Котушка Flagman Armadale', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 110.00),
(2, 'Котушка Mitchell Avocet', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 89.50),
(2, 'Котушка Salmo Diamond', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 105.75),
(2, 'Котушка Tica Cambria', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 102.99),
(2, 'Котушка Penn Battle III', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 145.25),

(3, 'Набір блешень Mepps', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 25.30),
(3, 'Воблер Rapala', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 19.99),
(3, 'Силіконові приманки Relax', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 12.50),
(3, 'Блешня Blue Fox', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 22.75),
(3, 'Балансир Lucky John', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 18.90),
(3, 'Пількер Daiwa', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 35.99),
(3, 'Поппер Yo-Zuri', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 27.50),
(3, 'Джиг-головки Owner', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 15.99),
(3, 'Гачки Gamakatsu', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 10.75),
(3, 'Повідці Fluorocarbon', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 8.50),

(4, 'Плетений шнур Power Pro', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 19.99),
(4, 'Монофільна волосінь Shimano', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 9.50),
(4, 'Флюорокарбонова волосінь Seaguar', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 14.75),
(4, 'Лідкор Korda', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 12.99),
(4, 'Зимова волосінь Salmo', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 7.25),
(4, 'Шок-лідер Berkley', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 16.99),
(4, 'Основна волосінь Trabucco', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 11.50),
(4, 'Фідерний шнур Matrix', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 18.50),
(4, 'Волосінь для спінінгу Daiwa', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 13.99),
(4, 'Кліпса для фідерної волосіні', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 5.99),

(5, 'Прикормка Sensas', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 14.50),
(5, 'Прикормка Flagman', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 12.99),
(5, 'Дип для коропа CC Moore', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 20.25),
(5, 'Бойли Dynamite Baits', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 22.50),
(5, 'Пелетс Halibut', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 17.99),
(5, 'Живий мотиль', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 5.50),
(5, 'Опариш в упаковці', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 6.75),
(5, 'Підгодовувальна суміш Van Den Eynde', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 18.99),
(5, 'Ароматизатор Traper', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 9.50),
(5, 'Флюоресцентний атрактант', 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp', 11.25);

-- Таблиця для замовлень (основна інформація про замовлення)
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_price DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Таблиця для деталей замовлення (список товарів у замовленні)
CREATE TABLE OrderDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) GENERATED ALWAYS AS (
        quantity * price_per_unit
    ) STORED,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);