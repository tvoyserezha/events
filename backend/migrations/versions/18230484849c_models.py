"""Models

Revision ID: 18230484849c
Revises: 
Create Date: 2021-06-14 15:40:37.831430

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18230484849c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('event_themes', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('event_themes', sa.Column('id', sa.BIGINT(), autoincrement=True, nullable=False))
    # ### end Alembic commands ###