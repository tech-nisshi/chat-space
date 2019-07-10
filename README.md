# DB設計

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|group|references|foreign_key:true|
|user|references|foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
|email|string|null: false, default: ""|
|encrypted_password|string|null: false, default""|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :group_users
- has_many :group_users
- validates :name, presence: true, uniqueness: true


