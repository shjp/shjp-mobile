import buildTextField from './buildTextField';
import buildLongtextField from './buildLongtextField';
import buildImageField from './buildImageField';
import buildLocationField from './buildLocationField';
import buildDateField from './buildDateField';
import buildListField from './buildListField';
import buildMembershipField from './buildMembershipField';
import buildJoinField from './buildJoinField';
import buildRolePillField from './buildRolePillField';
import buildShortText from './buildShortText';

const buildField = (mode, field, state, update) => {
  switch (field.type) {
    case 'text':         return buildTextField(mode, field, state, update);
    case 'longtext':     return buildLongtextField(mode, field, state, update);
    case 'shorttext':    return buildShortText(mode, field, state, update);
    case 'image':        return buildImageField(mode, field, state, update);
    case 'location':     return buildLocationField(mode, field, state, update);
    case 'date':         return buildDateField(mode, field, state, update);
    case 'list':         return buildListField(mode, field, state, update);
    case 'membership':   return buildMembershipField(mode, field, state, update);
    case 'join':         return buildJoinField(mode, field, state, update);
    case 'role-pill':    return buildRolePillField(mode, field, state, update);
  }
};

export {
  buildField
};