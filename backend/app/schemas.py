from pydantic import BaseModel, EmailStr, constr, validator
from typing import Optional, List
from datetime import datetime

class AgentCreate(BaseModel):
    name: str
    description: str
    config: dict

class ToolCreate(BaseModel):
    name: str
    api_endpoint: str
    config_schema: dict

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    password: constr(min_length=8)
    confirm_password: str

    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords do not match')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    scopes: List[str] = []
    exp: Optional[int] = None

class RefreshToken(BaseModel):
    refresh_token: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True
