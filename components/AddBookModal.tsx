import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Book } from '@/constants/Book';
import { useBookStore } from '@/hooks/bookStore';

interface AddBookModalProps {
  visible: boolean;
  onClose: () => void;
  textColor: string;
  backgroundColor: string;
  tintColor: string;
}

export function AddBookModal({
  visible,
  onClose,
  textColor,
  backgroundColor,
  tintColor,
}: AddBookModalProps) {
  const addBook = useBookStore((state) => state.addBook);

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [status, setStatus] = useState<Book['status']>('not read');
  const [rating, setRating] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const [tempCoverUrl, setTempCoverUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const resetForm = () => {
    setTitle('');
    setAuthors('');
    setIsbn('');
    setPageCount('');
    setStatus('not read');
    setRating('');
    setCoverImageUrl('');
  };

  const handlePickCover = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      setTempCoverUrl(result.assets[0].uri);
      setShowPreview(true);
    }
  };

  const handleConfirmCover = () => {
    setCoverImageUrl(tempCoverUrl);
    setTempCoverUrl('');
    setShowPreview(false);
  };

  const handleCancelPreview = () => {
    setTempCoverUrl('');
    setShowPreview(false);
  };

  const handleAddBook = () => {
    if (!title.trim()) return;

    const newBook: Book = {
      id: Date.now().toString(),
      title: title.trim(),
      authors: authors.trim() ? authors.split(',').map((a) => a.trim()) : undefined,
      isbn: isbn.trim() || undefined,
      pageCount: pageCount ? parseInt(pageCount) : undefined,
      status,
      rating: rating ? parseFloat(rating) : undefined,
      coverImageUrl: coverImageUrl.trim() || undefined,
    };

    addBook(newBook);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelPreview}
      >
        <View style={styles.previewOverlay}>
          <View style={[styles.previewContainer, { backgroundColor }]}>
            <Text style={[styles.previewTitle, { color: textColor }]}>Confirm Cover Image</Text>
            {tempCoverUrl && (
              <Image
                source={{ uri: tempCoverUrl }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.previewButtons}>
              <TouchableOpacity
                style={[styles.previewButton, styles.cancelButton, { borderColor: textColor + '40' }]}
                onPress={handleCancelPreview}
              >
                <Text style={[styles.buttonText, { color: textColor }]}>Choose Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.previewButton, { backgroundColor: tintColor }]}
                onPress={handleConfirmCover}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <View style={styles.modalBody}>
            <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent}>
              <Text style={[styles.modalTitle, { color: textColor }]}>Add New Book</Text>

            <Text style={[styles.label, { color: textColor }]}>Cover Image URL</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
              value={coverImageUrl}
              onChangeText={setCoverImageUrl}
              placeholder="https://..."
              placeholderTextColor={textColor + '60'}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={[styles.pickButton, { borderColor: textColor + '40', backgroundColor: tintColor }]}
              onPress={handlePickCover}
            >
              <Text style={[styles.pickButtonText, { color: '#fff' }]}>Pick from photos</Text>
            </TouchableOpacity>

            <Text style={[styles.label, { color: textColor }]}>Title *</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter book title"
              placeholderTextColor={textColor + '60'}
            />

            <Text style={[styles.label, { color: textColor }]}>Authors (comma separated)</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
              value={authors}
              onChangeText={setAuthors}
              placeholder="e.g., J.K. Rowling, Stephen King"
              placeholderTextColor={textColor + '60'}
            />

            <Text style={[styles.label, { color: textColor }]}>ISBN</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
              value={isbn}
              onChangeText={setIsbn}
              placeholder="Enter ISBN"
              placeholderTextColor={textColor + '60'}
            />

            <Text style={[styles.label, { color: textColor }]}>Page Count</Text>
            <TextInput
              style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
              value={pageCount}
              onChangeText={setPageCount}
              placeholder="Enter page count"
              placeholderTextColor={textColor + '60'}
              keyboardType="numeric"
            />

            <Text style={[styles.label, { color: textColor }]}>Status</Text>
            <View style={styles.statusButtons}>
              {(['not read', 'read'] as const).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.statusButton,
                    { borderColor: textColor + '40' },
                    status === s && { backgroundColor: tintColor },
                  ]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[styles.statusButtonText, { color: textColor }]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {status === 'read' && (
              <>
              <Text style={[styles.label, { color: textColor }]}>Rating (0-5)</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
                value={rating}
                onChangeText={setRating}
                placeholder="Enter rating"
                placeholderTextColor={textColor + '60'}
                keyboardType="decimal-pad"
              />
              <Text style={[styles.label, { color: textColor }]}>Date Started</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={textColor + '60'}
              />

              <Text style={[styles.label, { color: textColor }]}>Date Finished</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor + '40' }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={textColor + '60'}
              />

              <Text style={[styles.label, { color: textColor }]}>Review</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor: textColor + '40' }, styles.reviewInput]}
                placeholder="Write your review"
                placeholderTextColor={textColor + '60'}
                multiline={true}
                numberOfLines={4}
              />
              </>
            )}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton, { borderColor: textColor + '40' }]}
                  onPress={handleClose}
                >
                  <Text style={[styles.buttonText, { color: textColor }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.addButton, { backgroundColor: tintColor }]}
                  onPress={handleAddBook}
                >
                  <Text style={styles.buttonText}>Add Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 32,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 16,
  },
  previewButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  previewButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    flex: 1,
    borderRadius: 12,
    padding: 20,
  },
  formScroll: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  statusButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 14,
  },
  statusButtonText: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  footer: {
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#00000010',
    backgroundColor: 'transparent',
  },
  pickButton: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  pickButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  addButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
