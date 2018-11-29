import buildTextField from './buildTextField';
import buildLongtextField from './buildLongtextField';
import buildImageField from './buildImageField';
import buildLocationField from './buildLocationField';
import buildListField from './buildListField';

const buildField = (mode, field, state, update) => {
  switch (field.type) {
    case 'text':     return buildTextField(mode, field, state, update);
    case 'longtext': return buildLongtextField(mode, field, state, update);
    case 'image':    return buildImageField(mode, field, state, update);
    case 'location': return buildLocationField(mode, field, state, update);
    case 'list':     return buildListField(mode, field, state, update);
  }
};

export {
  buildField
};