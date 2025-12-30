import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Book } from '@/src/constants/Book';
import { useBookStore } from '@/src/store/bookStore';

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

  const resetForm = () => {
    setTitle('');
    setAuthors('');
    setIsbn('');
    setPageCount('');
    setStatus('not read');
    setRating('');
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
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <ScrollView>
            <Text style={[styles.modalTitle, { color: textColor }]}>Add New Book</Text>

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
          </ScrollView>
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
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
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
    marginTop: 24,
    gap: 12,
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
