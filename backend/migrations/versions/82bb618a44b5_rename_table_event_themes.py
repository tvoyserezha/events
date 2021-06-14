"""Rename table event_themes

Revision ID: 82bb618a44b5
Revises: 50eea56818d4
Create Date: 2021-06-14 15:51:22.734295

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '82bb618a44b5'
down_revision = '50eea56818d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('EventThemeModel')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('EventThemeModel',
    sa.Column('theme_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('event_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], name='EventThemeModel_event_id_fkey'),
    sa.ForeignKeyConstraint(['theme_id'], ['themes.id'], name='EventThemeModel_theme_id_fkey')
    )
    # ### end Alembic commands ###